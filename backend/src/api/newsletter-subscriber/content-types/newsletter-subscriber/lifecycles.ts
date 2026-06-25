export default {
  async afterCreate(event: any) {
    const { result } = event;

    if (!result || !result.email) return;

    try {
      await strapi.plugin('email').service('email').send({
        to: result.email,
        subject: 'Welcome to the AI GreenTick Newsletter!',
        text: 'Thank you for subscribing to receive WhatsApp API strategies, scaling checklists, and automation hacks.',
        html: `
          <div style="font-family: sans-serif; padding: 24px; max-width: 600px; margin: 0 auto; background-color: #ECEBE9; color: #000; border: 1px solid #C5C4C2;">
            <div style="text-align: center; margin-bottom: 24px;">
              <span style="display: inline-block; padding: 4px 8px; font-size: 10px; font-weight: bold; color: #00b259; border: 1px solid #00b259; background-color: rgba(0, 182, 89, 0.1); font-family: monospace; letter-spacing: 1px;">
                :: NEWSLETTER SUBSCRIBE ::
              </span>
            </div>
            <h2 style="font-size: 20px; font-weight: bold; text-align: center; margin-bottom: 16px; font-family: sans-serif;">Get Future Insights Direct to Inbox</h2>
            <p style="font-size: 14px; line-height: 1.5; color: #333; margin-bottom: 24px; text-align: center; font-family: sans-serif;">
              Join 5,000+ businesses receiving WhatsApp API strategies, scaling checklists, and automation hacks every fortnight.
            </p>
            <div style="text-align: center; margin-bottom: 24px;">
              <a href="https://aigreentick.com" style="display: inline-block; padding: 12px 24px; background-color: #00b259; color: #fff; text-decoration: none; font-size: 12px; font-weight: bold; letter-spacing: 1px; font-family: sans-serif;">
                VISIT AI GREENTICK
              </a>
            </div>
            <hr style="border: none; border-top: 1px solid #C5C4C2; margin: 24px 0;" />
            <p style="font-size: 10px; color: #666; text-align: center; margin: 0; font-family: sans-serif;">
              If you did not request this subscription, you can safely ignore this email.
            </p>
          </div>
        `,
      });
      strapi.log.info(`Newsletter confirmation email successfully sent to ${result.email}`);
    } catch (error) {
      strapi.log.error(`Failed to send newsletter confirmation email to ${result.email}:`, error);
    }
  },
};
