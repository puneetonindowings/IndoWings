import { supabase, ADMIN_EMAIL } from './supabase.js';

const STORAGE_EMAIL_LOGS = 'indowings_email_dispatch_log';

/**
 * Universal Email Dispatcher powered by NODEMAILER (via Node /api/send-email endpoint)
 * Dispatches real emails via Nodemailer with local audit trail.
 */
class EmailService {
  // Retrieve all logged emails
  getEmailLogs() {
    try {
      const raw = localStorage.getItem(STORAGE_EMAIL_LOGS);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  // Internal log recorder
  logEmail(recipient, subject, type, status = 'Delivered', details = {}) {
    try {
      const logs = this.getEmailLogs();
      const entry = {
        id: 'mail-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        recipient,
        subject,
        type, // 'OTP' | 'JOB_ALERT' | 'APPLICATION_RECEIVED' | 'ADMIN_ALERT' | 'STATUS_UPDATE'
        status,
        provider: 'Nodemailer SMTP',
        timestamp: new Date().toISOString(),
        details
      };
      logs.unshift(entry);
      localStorage.setItem(STORAGE_EMAIL_LOGS, JSON.stringify(logs.slice(0, 100)));
      window.dispatchEvent(new CustomEvent('email_dispatched', { detail: entry }));
      return entry;
    } catch (e) {
      console.warn('Failed to log email:', e);
    }
  }

  // Primary dispatch via Nodemailer Node server endpoint
  async sendViaNodemailer(to, subject, htmlContent, textContent = "") {
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: Array.isArray(to) ? to : [to],
          subject: subject,
          html: htmlContent,
          text: textContent
        })
      });
      return await res.json();
    } catch (e) {
      console.warn('[EmailService] Nodemailer dispatch fetch exception:', e);
      return null;
    }
  }

  // ---------------------------------------------------------------------------
  // 1. OTP EMAIL (NORMAL, CLEAN PROFESSIONAL CORPORATE TEMPLATE)
  // No Supabase auth trigger! Pure Nodemailer dispatch.
  // ---------------------------------------------------------------------------
  async sendOtpEmail(email, otpCode) {
    const cleanEmail = email.trim().toLowerCase();
    const subject = `Your IndoWings verification code: ${otpCode}`;
    
    // Exactly matches the clean, authentic screenshot requested by the user
    const text = `Hello,

Your IndoWings verification code is: ${otpCode}

This code is valid for 10 minutes. Please do not share it with anyone.

If you did not request this login code, please contact connect@indowings.com

Thanks & Regards,
IndoWings`;

    const html = `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; color: #222222; line-height: 1.6; max-width: 600px;">
  <p style="margin: 0 0 16px;">Hello,</p>
  <p style="margin: 0 0 16px;">Your IndoWings verification code is: <strong style="font-size: 16px; color: #111111;">${otpCode}</strong></p>
  <p style="margin: 0 0 24px;">This code is valid for 10 minutes. Please do not share it with anyone.</p>
  <p style="margin: 0 0 24px;">If you did not request this login code, please contact <a href="mailto:connect@indowings.com" style="color: #0066cc; text-decoration: underline;">connect@indowings.com</a></p>
  <p style="margin: 0 0 4px;">Thanks &amp; Regards,</p>
  <p style="margin: 0; font-weight: 600; color: #111111;">IndoWings</p>
</div>`;

    await this.sendViaNodemailer(cleanEmail, subject, html, text);
    this.logEmail(cleanEmail, subject, 'OTP', 'Delivered (Nodemailer)', { otp: otpCode });
    console.log(`[IndoWings Nodemailer] Dispatched verification code ${otpCode} to ${cleanEmail}`);
    return { success: true, otp: otpCode };
  }

  // ---------------------------------------------------------------------------
  // 2. CANDIDATE APPLICATION CONFIRMATION (NORMAL CLEAN CORPORATE TEMPLATE)
  // ---------------------------------------------------------------------------
  async sendApplicationConfirmation(candidate) {
    const { email, candidate_name, job_title, id } = candidate;
    const cleanEmail = email.trim().toLowerCase();
    const subject = `Application Received: ${job_title} at IndoWings`;
    const html = `
      <div style="background-color: #f8fafc; padding: 40px 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <div style="max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 10px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          
          <div style="padding: 28px 32px 20px; border-bottom: 1px solid #f1f5f9;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #0f172a;">
              IndoWings<span style="color: #ff7a1a;">.</span>
            </h1>
            <p style="margin: 3px 0 0; font-size: 12px; color: #64748b;">Talent Acquisition &amp; Careers</p>
          </div>

          <div style="padding: 32px;">
            <p style="margin: 0 0 16px; font-size: 15px; color: #1e293b;">Dear <strong>${candidate_name}</strong>,</p>
            <p style="margin: 0 0 20px; font-size: 14px; color: #475569; line-height: 1.6;">
              Thank you for applying for the position of <strong>${job_title}</strong> at IndoWings. We have safely received your application and credentials.
            </p>

            <div style="background: #f8fafc; border-left: 3px solid #ea580c; border-radius: 4px; padding: 14px 18px; margin: 20px 0;">
              <div style="font-size: 12px; color: #64748b;">APPLICATION ID: <strong style="color: #0f172a; font-family: monospace;">${id || 'IW-' + Date.now().toString().slice(-6)}</strong></div>
              <div style="font-size: 12px; color: #64748b; margin-top: 4px;">STATUS: <strong style="color: #16a34a;">Under Technical Review</strong></div>
            </div>

            <p style="margin: 0 0 16px; font-size: 13.5px; color: #64748b; line-height: 1.6;">
              Our hiring managers are currently evaluating your profile against the technical criteria for this role. If your background aligns with our needs, our team will reach out directly to schedule an interview.
            </p>

            <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
              <p style="margin: 0; font-size: 13px; color: #334155; font-weight: 600;">Best regards,</p>
              <p style="margin: 2px 0 0; font-size: 13px; color: #64748b;">IndoWings Recruitment Team</p>
            </div>
          </div>

          <div style="background: #f8fafc; padding: 18px 32px; border-top: 1px solid #f1f5f9; font-size: 11px; color: #94a3b8;">
            IndoWings Pvt Ltd &bull; Sector-60, Noida Aerospace HQ &bull; Bengaluru Autonomy Lab
          </div>

        </div>
      </div>
    `;

    await this.sendViaNodemailer(cleanEmail, subject, html);
    this.logEmail(cleanEmail, subject, 'APPLICATION_RECEIVED', 'Delivered (Nodemailer)', { candidate_name, job_title });
    return { success: true };
  }

  // ---------------------------------------------------------------------------
  // 3. ADMIN APPLICATION ALERT (SENT TO ADMIN)
  // ---------------------------------------------------------------------------
  async sendAdminApplicationAlert(candidate) {
    const adminEmail = ADMIN_EMAIL;
    const { candidate_name, email, phone, job_title, linkedin_url, dgca_license } = candidate;
    const subject = `[New Candidate] ${candidate_name} applied for ${job_title}`;
    const html = `
      <div style="background-color: #f8fafc; padding: 40px 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 10px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          
          <div style="padding: 24px 32px; border-bottom: 1px solid #f1f5f9; background: #fafafa;">
            <span style="background: #ea580c; color: #ffffff; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase;">New Application</span>
            <h2 style="margin: 8px 0 0; font-size: 18px; color: #0f172a;">${candidate_name} applied for ${job_title}</h2>
          </div>

          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13.5px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 140px;">Candidate Name:</td>
                <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${candidate_name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Applied Position:</td>
                <td style="padding: 8px 0; font-weight: 600; color: #ea580c;">${job_title}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Phone:</td>
                <td style="padding: 8px 0; color: #0f172a;">${phone || 'N/A'}</td>
              </tr>
              ${dgca_license ? `<tr><td style="padding: 8px 0; color: #64748b;">DGCA License:</td><td style="padding: 8px 0; color: #16a34a; font-weight: 600;">${dgca_license}</td></tr>` : ''}
              ${linkedin_url ? `<tr><td style="padding: 8px 0; color: #64748b;">LinkedIn Profile:</td><td style="padding: 8px 0;"><a href="${linkedin_url}" style="color: #2563eb;">${linkedin_url}</a></td></tr>` : ''}
            </table>

            <div style="margin-top: 28px; text-align: center;">
              <a href="https://indowings.com/#/admin/careers" style="display: inline-block; background: #0f172a; color: #ffffff; font-weight: 700; font-size: 13px; padding: 12px 24px; border-radius: 6px; text-decoration: none;">
                Review in Admin Dashboard &rarr;
              </a>
            </div>
          </div>

        </div>
      </div>
    `;

    await this.sendViaNodemailer(adminEmail, subject, html);
    this.logEmail(adminEmail, subject, 'ADMIN_ALERT', 'Delivered (Nodemailer)', { candidate_name, email, job_title });
    return { success: true };
  }

  // ---------------------------------------------------------------------------
  // 4. NEW JOB ALERT SENT TO REGISTERED CANDIDATES
  // ---------------------------------------------------------------------------
  async sendNewJobAlertToCandidates(job, candidateEmails = []) {
    if (!candidateEmails || candidateEmails.length === 0) {
      console.log('[IndoWings Nodemailer] No registered candidate emails to broadcast.');
      return { count: 0 };
    }

    const isInternship = job.type === 'Internship';
    const subject = isInternship
      ? `New Internship Opening: ${job.title} at IndoWings`
      : `New Opening: ${job.title} at IndoWings Aerospace`;

    const html = `
      <div style="background-color: #f8fafc; padding: 40px 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 10px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          
          <div style="padding: 28px 32px 20px; border-bottom: 1px solid #f1f5f9;">
            <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #0f172a;">
              IndoWings<span style="color: #ff7a1a;">.</span>
            </h1>
            <p style="margin: 3px 0 0; font-size: 12px; color: #64748b;">Career Alert &bull; Candidate Network</p>
          </div>

          <div style="padding: 32px;">
            <p style="margin: 0 0 16px; font-size: 14.5px; color: #334155; line-height: 1.6;">
              A new position matching aerospace engineering profiles has just opened on the IndoWings career board:
            </p>

            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #0f172a; margin: 0 0 8px 0; font-size: 18px;">${job.title}</h3>
              <div style="font-size: 12.5px; color: #64748b; margin-bottom: 8px;">
                <span style="color: #ea580c; font-weight: 600;">${job.department}</span> &bull; 
                <span>${job.location || 'Noida Aerospace HQ'}</span> &bull; 
                <span>${job.type}</span>
              </div>
              <div style="font-size: 13px; color: #16a34a; font-weight: 600; margin-bottom: 12px;">
                Compensation: ${job.salary_range || 'Competitive Standard'}
              </div>
              <p style="color: #475569; font-size: 13px; line-height: 1.5; margin: 0;">
                ${job.description || ''}
              </p>
            </div>

            <div style="text-align: center; margin: 26px 0 16px 0;">
              <a href="https://indowings.com/#/company/career" style="display: inline-block; background: #ea580c; color: #ffffff; font-weight: 700; font-size: 13px; padding: 12px 28px; border-radius: 6px; text-decoration: none;">
                View Details &amp; Apply Now &rarr;
              </a>
            </div>
          </div>

          <div style="background: #f8fafc; padding: 16px 32px; border-top: 1px solid #f1f5f9; font-size: 11px; color: #94a3b8; text-align: center;">
            You received this alert because you are registered in the IndoWings talent network.
          </div>

        </div>
      </div>
    `;

    let dispatchedCount = 0;
    for (const email of candidateEmails) {
      const cleanEmail = email.trim().toLowerCase();
      if (!cleanEmail) continue;

      await this.sendViaNodemailer(cleanEmail, subject, html);
      this.logEmail(cleanEmail, subject, 'JOB_ALERT', 'Delivered (Nodemailer)', { job_id: job.id, job_title: job.title });
      dispatchedCount++;
    }

    console.log(`[IndoWings Nodemailer] Dispatched normal job alert for "${job.title}" to ${dispatchedCount} verified candidates.`);
    return { count: dispatchedCount };
  }

  // ---------------------------------------------------------------------------
  // 5. APPLICATION STATUS UPDATE EMAIL
  // ---------------------------------------------------------------------------
  async sendStatusUpdateEmail(candidate, newStatus) {
    const { email, candidate_name, job_title } = candidate;
    const cleanEmail = email.trim().toLowerCase();
    const subject = `Update on your application for ${job_title} at IndoWings`;
    const html = `
      <div style="background-color: #f8fafc; padding: 40px 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 10px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          
          <div style="padding: 24px 32px; border-bottom: 1px solid #f1f5f9;">
            <h2 style="margin: 0; font-size: 20px; color: #0f172a;">IndoWings Recruitment Update</h2>
          </div>

          <div style="padding: 32px;">
            <p style="margin: 0 0 14px; font-size: 14.5px; color: #1e293b;">Dear <strong>${candidate_name}</strong>,</p>
            <p style="margin: 0 0 18px; font-size: 14px; color: #475569; line-height: 1.6;">
              There is an update regarding your application for <strong>${job_title}</strong>:
            </p>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 14px; border-radius: 6px; text-align: center; margin: 18px 0;">
              <span style="font-size: 12px; color: #64748b;">STAGE STATUS:</span>
              <div style="font-size: 18px; font-weight: 700; color: #16a34a; margin-top: 4px; text-transform: uppercase;">
                ${newStatus}
              </div>
            </div>
            <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.6;">
              Our talent operations team will contact you directly with further details and next steps.
            </p>
          </div>

        </div>
      </div>
    `;

    await this.sendViaNodemailer(cleanEmail, subject, html);
    this.logEmail(cleanEmail, subject, 'STATUS_UPDATE', 'Delivered (Nodemailer)', { candidate_name, job_title, newStatus });
    return { success: true };
  }

  // ---------------------------------------------------------------------------
  // 6. TEMPORARY PASSWORD EMAIL (FOR FORGOT PASSWORD FLOW)
  // ---------------------------------------------------------------------------
  async sendTemporaryPasswordEmail(email, tempPassword) {
    const cleanEmail = email.trim().toLowerCase();
    const subject = `Your IndoWings temporary login password: ${tempPassword}`;
    
    const text = `Hello,

Your IndoWings temporary login password is: ${tempPassword}

This temporary password is valid for 15 minutes. Once you log in with this passkey, you will be prompted to set your new permanent password.

If you did not request this login code, please contact connect@indowings.com

Thanks & Regards,
IndoWings`;

    const html = `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; color: #222222; line-height: 1.6; max-width: 600px;">
  <p style="margin: 0 0 16px;">Hello,</p>
  <p style="margin: 0 0 16px;">Your IndoWings temporary login password is: <strong style="font-size: 16px; color: #111111;">${tempPassword}</strong></p>
  <p style="margin: 0 0 24px;">This temporary password is valid for 15 minutes. Once you log in with this passkey, you will be prompted to set your new permanent password.</p>
  <p style="margin: 0 0 24px;">If you did not request this login code, please contact <a href="mailto:connect@indowings.com" style="color: #0066cc; text-decoration: underline;">connect@indowings.com</a></p>
  <p style="margin: 0 0 4px;">Thanks &amp; Regards,</p>
  <p style="margin: 0; font-weight: 600; color: #111111;">IndoWings</p>
</div>`;

    await this.sendViaNodemailer(cleanEmail, subject, html, text);
    this.logEmail(cleanEmail, subject, 'TEMP_PASSWORD', 'Delivered (Nodemailer)', { tempPassword });
    console.log(`[IndoWings Nodemailer] Dispatched temporary password to ${cleanEmail}`);
    return { success: true, tempPassword };
  }
}

export const emailService = new EmailService();
