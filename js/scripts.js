document.addEventListener('DOMContentLoaded', (event) => {
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const text = button.getAttribute('data-clipboard-text').replace(/\\n/g, '\n');
            navigator.clipboard.writeText(text).then(() => {
                button.querySelector('i').classList.remove('fa-copy');
                button.querySelector('i').classList.add('fa-check');
                setTimeout(() => {
                    button.querySelector('i').classList.remove('fa-check');
                    button.querySelector('i').classList.add('fa-copy');
                }, 2000);
            });
        });
    });
});



 // Hide and show navbar on scroll
 let prevScrollpos = window.pageYOffset;
 window.onscroll = function() {
     let currentScrollPos = window.pageYOffset;
     if (prevScrollpos > currentScrollPos) {
         document.querySelector('.top-nav').style.top = "0";
     } else {
         document.querySelector('.top-nav').style.top = "-70px";
     }
     prevScrollpos = currentScrollPos;

     // Show or hide the move to top button
     if (currentScrollPos > 300) {
         document.getElementById('moveToTopBtn').style.display = "block";
     } else {
         document.getElementById('moveToTopBtn').style.display = "none";
     }
 };

 // Move to top functionality
 document.getElementById('moveToTopBtn').addEventListener('click', function() {
     window.scrollTo({top: 0, behavior: 'smooth'});
 });




 // Store the original content
 let originalContent = {};

 document.addEventListener('DOMContentLoaded', () => {
     const elements = document.querySelectorAll('.code-block code, .code-block .copy-btn');
     elements.forEach((el, index) => {
         originalContent[index] = {
             html: el.innerHTML,
             text: el.hasAttribute('data-clipboard-text') ? el.getAttribute('data-clipboard-text') : null
         };
     });
 });

 function applySettings() {
     const projectFolderName = document.getElementById('projectFolderName').value || 'ProjectFolderName';
     const projectName = document.getElementById('projectName').value || 'ProjectName';
     const appName = document.getElementById('appName').value || 'AppName';
     const userName = document.getElementById('userName').value || 'UserName';

     const elements = document.querySelectorAll('.code-block code, .code-block .copy-btn');

     elements.forEach((el, index) => {
         const originalHtml = originalContent[index].html;
         const originalText = originalContent[index].text;

         const updatedHtml = originalHtml.replace(/ProjectFolderName/g, projectFolderName)
                                        .replace(/ProjectName/g, projectName)
                                        .replace(/AppName/g, appName)
                                        .replace(/UserName/g, userName);

         el.innerHTML = updatedHtml;

         if (originalText !== null) {
             const updatedText = originalText.replace(/ProjectFolderName/g, projectFolderName)
                                             .replace(/ProjectName/g, projectName)
                                             .replace(/AppName/g, appName)
                                             .replace(/UserName/g, userName);
             el.setAttribute('data-clipboard-text', updatedText);
         }
     });
 }