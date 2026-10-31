import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import nodemailer from 'nodemailer';

// Custom Vite Server Plugin for Nodemailer SMTP dispatch
function nodemailerApiPlugin(env) {
  return {
    name: 'nodemailer-api-middleware',
    configureServer(server) {
      server.middlewares.use('/api/send-email', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let bodyStr = '';
        req.on('data', chunk => {
          bodyStr += chunk;
        });

        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json');
          try {
            const data = JSON.parse(bodyStr || '{}');
            const { to, subject, html, text } = data;

            if (!to || !subject) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Recipient "to" and "subject" are required.' }));
              return;
            }

            // Read SMTP credentials from .env
            const host = env.SMTP_HOST || env.VITE_SMTP_HOST || 'smtp.gmail.com';
            const port = parseInt(env.SMTP_PORT || env.VITE_SMTP_PORT || '587', 10);
            const user = env.SMTP_USER || env.VITE_SMTP_USER || '';
            const pass = env.SMTP_PASS || env.VITE_SMTP_PASS || '';
            const from = env.SMTP_FROM || env.VITE_SMTP_FROM || `"IndoWings" <${user || "connect@indowings.com"}>`;

            if (!user || !pass) {
              console.warn('[Nodemailer] SMTP_USER or SMTP_PASS not set in .env. Falling back to simulation mode.');
              res.statusCode = 200;
              res.end(JSON.stringify({
                success: true,
                simulated: true,
                message: 'Nodemailer active. Configure SMTP_USER and SMTP_PASS in .env for live inbox delivery.'
              }));
              return;
            }

            // Create Nodemailer Transporter
            const transporter = nodemailer.createTransport({
              host: host,
              port: port,
              secure: port === 465,
              auth: {
                user: user,
                pass: pass
              }
            });

            const recipients = Array.isArray(to) ? to.join(', ') : to;

            const mailOptions = {
              from: from,
              to: recipients,
              subject: subject,
              html: html,
              text: text || ''
            };

            const info = await transporter.sendMail(mailOptions);
            console.log('[Nodemailer] Email successfully delivered:', info.messageId, 'to:', recipients);

            res.statusCode = 200;
            res.end(JSON.stringify({
              success: true,
              messageId: info.messageId,
              recipients: recipients
            }));
          } catch (err) {
            console.error('[Nodemailer] Failed to send email:', err);
            res.statusCode = 500;
            res.end(JSON.stringify({
              error: err.message || 'Failed to dispatch email via Nodemailer'
            }));
          }
        });
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      nodemailerApiPlugin(env)
    ],
    server: {
      port: 5173,
      open: true,
    },
  };
});
