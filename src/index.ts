export default {
  async bootstrap({ strapi }: { strapi: any }) {
    // ✅ Reset admin password temporarily
    const email = 'mohammedelsisi21@gmail.com';
    const newPassword = 'Admin@123';

    const adminUser = await strapi.db.query('admin::user').findOne({ where: { email } });

    if (adminUser) {
      const newHashedPassword = await strapi.service('admin::auth').hashPassword(newPassword);
      await strapi.db.query('admin::user').update({
        where: { id: adminUser.id },
        data: { password: newHashedPassword },
      });
      console.log(`✅ Password reset successful for ${email}`);
    } else {
      console.log('⚠️ No admin found with that email');
    }
  },
};
