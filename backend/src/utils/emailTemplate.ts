export const emailTemplate = ({
  otp,
  timer,
}: {
  otp?: number;
  timer?: number;
}) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OTP Verification</title>
  </head>

  <body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" 
                 style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">

            <!-- HEADER -->
            <tr>
              <td style="background:#0d6efd;padding:20px;text-align:center;">
                <img src="https://jeevanhomeservices.com/assets/jeevanhomeservicesLogo.png"
                     alt="Jeevan Home Services"
                     width="140" />
              </td>
            </tr>

            <!-- TITLE -->
            <tr>
              <td style="padding:30px;text-align:center;">
                <h2 style="margin:0;color:#222;">OTP Verification</h2>
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:0 30px 30px 30px;color:#555;font-size:15px;line-height:1.6;">
                Your OTP is ${otp} to complete your request. This OTP is valid for ${timer || 5} minutes. Please do not share this code with anyone. Thank you for choosing Jeevan Home Services. Visit us at: https://jeevanhomeservices.com⁠
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background:#f8f9fa;padding:25px;font-size:13px;color:#666;text-align:center;">
        
                <p style="margin-top:15px;">
                  📍 Lucknow Sukh Complex, SN 45, Munshi Pulia, Sector 16, Indira Nagar, Lucknow
                </p>

                <p>
                  📞 +91 8960628965 <br/>
                  ✉️ jeevancleaningservices@gmail.com
                </p>

                <p>
                  <a href="https://m.facebook.com/JeevanCleaningServices/">Facebook</a> |
                  <a href="https://www.instagram.com/jeevan_home_services/">Instagram</a> |
                  <a href="https://youtube.com/@jeevancleaningservices">YouTube</a>
                </p>

                <p style="margin-top:10px;">
                  © ${new Date().getFullYear()} Jeevan Home Services
                </p>

              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
};
