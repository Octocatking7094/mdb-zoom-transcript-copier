function injectCopyButton() {  
  if (document.getElementById('copyTranscriptBtn')) return; // Prevent duplicates  
  
  // Find the transcript list  
  const transcriptList = document.querySelector('ul[aria-label="Audio Transcript List"]');  
  if (!transcriptList) return;  
  
  // Create button  
  const btn = document.createElement('button');  
  btn.textContent = 'Copy Transcript to Clipboard';  
  btn.id = 'copyTranscriptBtn';  
  btn.style.position = 'fixed';  
  btn.style.top = '20px';  
  btn.style.right = '20px';  
  btn.style.zIndex = 10000;  
  btn.style.fontSize = '16px';  
  btn.style.background = '#3d8bff';  
  btn.style.color = 'white';  
  btn.style.border = 'none';  
  btn.style.padding = '10px 18px';  
  btn.style.borderRadius = '6px';  
  btn.style.cursor = 'pointer';  
  document.body.appendChild(btn);  
  
  btn.onclick = () => {  
    // Copy plain text version  
    const plainText = transcriptList.innerText;  
    navigator.clipboard.writeText(plainText)  
      .then(() => {  
        btn.textContent = 'Copied!';  
        setTimeout(()=>btn.textContent='Copy Transcript to Clipboard',1500);  
      })  
      .catch(err => {  
        btn.textContent = 'Failed to Copy!';  
        alert('Error: ' + err);  
      });  
  };  
}  
  
// Retry to inject when DOM changes (since Zoom loads transcript via AJAX)  
const observer = new MutationObserver(() => {  
  injectCopyButton();  
});  
observer.observe(document.body, { childList: true, subtree: true });  
  
// Initial injection (in case transcript loads immediately)  
injectCopyButton();  
