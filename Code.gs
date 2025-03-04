// Add this test function at the top of your Code.gs file
function testDoPost() {
  // Mock POST data with proper structure
  const mockData = {
    firstName: "Test",
    lastName: "User",
    email: "test@example.com",
    phone: "1234567890",
    cohort: "Cohort 1",
    timestamp: new Date().toISOString(),
    fileData: "data:image/jpeg;base64,/9j/4AAQSkZJRg==", // Sample base64 data
    fileName: "test.jpg",
    fileType: "image/jpeg"
  };

  // Create the event object that mimics the actual POST request
  const e = {
    parameter: {},
    contextPath: "",
    contentLength: -1,
    queryString: "",
    parameters: {},
    postData: {
      length: -1,
      type: "application/json",
      contents: JSON.stringify(mockData),
      name: "postData"
    }
  };
  
  // Test the doPost function
  try {
    const result = doPost(e);
    console.log('Test completed successfully');
    console.log('Result:', result.getContent());
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Handle GET requests to verify the service is running
function doGet(e) {
  return ContentService.createTextOutput("Service is running")
    .setMimeType(ContentService.MimeType.TEXT);
}

// Handle POST requests for form submissions
function doPost(e) {
  try {
    // Verify we have post data
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('No post data received');
    }

    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    console.log('Received data:', JSON.stringify(data)); // Debug log
    
    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Format the date
    const formattedDate = new Date(data.timestamp).toLocaleString();
    
    // Get the file data
    const fileData = data.fileData; // Base64 encoded file
    if (!fileData) {
      throw new Error('No file data received');
    }
    console.log('File name:', data.fileName); // Debug log
    
    // Explicitly get root folder
    const root = DriveApp.getRootFolder();
    console.log('Got root folder access');
    
    // Create or get the folder
    const folderName = 'SOD2025 Payment Proofs';
    let folder;
    const folderIterator = DriveApp.getFoldersByName(folderName);
    
    if (folderIterator.hasNext()) {
      folder = folderIterator.next();
      console.log('Found existing folder:', folderName);
    } else {
      folder = root.createFolder(folderName);
      console.log('Created new folder:', folderName);
    }
    
    // Save file to Drive with more detailed error handling
    try {
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = fileData.split(',')[1];
      console.log('Extracted base64 data');
      
      // Decode the base64 data
      const decodedFile = Utilities.base64Decode(base64Data);
      console.log('Decoded base64 data');
      
      // Create the blob with the file data
      const blob = Utilities.newBlob(decodedFile, data.fileType, data.fileName);
      console.log('Created blob:', blob.getName(), 'type:', blob.getContentType());
      
      // Create the file in the folder
      const file = folder.createFile(blob);
      
      // Make the file accessible to anyone with the link
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      console.log('Created file in Drive and set sharing');
      
      // Get the file URL
      const fileUrl = file.getUrl();
      console.log('File URL:', fileUrl);
      
      // Convert to a direct download/view URL
      const webViewUrl = fileUrl.replace(/\/file\/d\/(.+?)\/view\?usp=drivesdk/, '/uc?export=view&id=$1');
      console.log('Web view URL:', webViewUrl);
      
      // Prepare the row data with file link
      const rowData = [
        data.firstName,
        data.lastName,
        data.email,
        data.phone,
        data.cohort,
        formattedDate,
        webViewUrl // Use the web view URL instead
      ];
      
      // Append the row
      sheet.appendRow(rowData);
      console.log('Row added to sheet');
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        fileUrl: fileUrl,
        message: 'Registration and file upload successful'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
    } catch (fileError) {
      console.error('File processing error:', fileError);
      throw new Error(`File upload failed: ${fileError.message}`);
    }
    
  } catch (error) {
    console.error('Error in doPost:', error);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle OPTIONS requests for CORS preflight
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
} 