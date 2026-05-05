const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');

function buildMultipartBody(boundary, additionalMetadata, fileName, fileBuffer) {
  const parts = [];

  if (additionalMetadata) {
    parts.push(
      `--${boundary}\r\nContent-Disposition: form-data; name="additionalMetadata"\r\n\r\n${additionalMetadata}\r\n`
    );
  }

  const fileHeader =
    `--${boundary}\r\n` +
    `Content-Disposition: form-data; name="file"; filename="${fileName}"\r\n` +
    `Content-Type: image/png\r\n\r\n`;

  return Buffer.concat([
    Buffer.from(parts.join('')),
    Buffer.from(fileHeader),
    fileBuffer,
    Buffer.from(`\r\n--${boundary}--\r\n`)
  ]);
}

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',
    setupNodeEvents(on, config) {
      config.baseUrl = config.env.BASE_URL;

      on('task', {
        uploadPetFileWithImage({ baseUrl, petId, filePath, additionalMetadata }) {
          return new Promise((resolve, reject) => {
            const fullPath = path.resolve(filePath);
            const fileBuffer = fs.readFileSync(fullPath);
            const fileName = path.basename(fullPath);
            const boundary = `CypressBoundary${Date.now()}`;
            const body = buildMultipartBody(boundary, additionalMetadata, fileName, fileBuffer);

            const url = new URL(`${baseUrl}/pet/${petId}/uploadFile`);
            const transport = url.protocol === 'https:' ? require('https') : require('http');

            const options = {
              hostname: url.hostname,
              port: url.port || (url.protocol === 'https:' ? 443 : 80),
              path: url.pathname,
              method: 'POST',
              headers: {
                'Content-Type': `multipart/form-data; boundary=${boundary}`,
                'Content-Length': body.length,
              }
            };

            const req = transport.request(options, (res) => {
              let data = '';
              res.on('data', (chunk) => { data += chunk; });
              res.on('end', () => {
                try {
                  resolve({ status: res.statusCode, body: JSON.parse(data) });
                } catch {
                  resolve({ status: res.statusCode, body: data });
                }
              });
            });

            req.on('error', reject);
            req.write(body);
            req.end();
          });
        }
      });

      on('after:run', async (results) => {
        const { generateReport } = require('./cypress/support/report_generator');
        await generateReport(results);
      });

      return config;
    }
  }
});
