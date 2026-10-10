# Hero House — GitHub Pages package

Static HTML, CSS, JavaScript, and images. No installation or build is required.

## Publish
1. Extract this ZIP.
2. Create a public GitHub repository (for example, hero-house).
3. Upload the extracted files and folders to the repository root. index.html must be at the root, not inside an extra enclosing folder. Do not upload the ZIP itself.
4. In repository Settings > Pages, select Deploy from a branch, choose main and / (root), then Save.
5. Use the published URL shown in Settings > Pages when deployment completes.

For an existing repository, avoid overwriting unrelated files; use a new repository or a dedicated directory with an appropriate Pages configuration.

## Optional FreeDNS address
First publish and test the GitHub Pages URL. Then follow GitHub Pages custom-domain setup for herohouse.mooo.com. Point its CNAME to YOUR-USERNAME.github.io (no https:// and no repository path), and enter herohouse.mooo.com in Settings > Pages > Custom domain. GitHub may offer an additional optional TXT ownership verification record; FreeDNS shared domains restrict underscore-prefixed records, so domain verification may require permission from the shared-domain owner. The previous ChatGPT TXT records and CNAME destination do not configure GitHub Pages.

## Update before using for a real organization
The contact phone, email, address and hours are sample details. Update contact.html and the footers in all three HTML files. Also update the mailto recipient in assets/site.js. The form opens an email draft in the visitor's email app; it does not send through a backend. Images are illustrative concepts, not active housing listings.

Files: index.html, about.html, contact.html, assets/, images/, .nojekyll, README.md.
