import { defineField, defineType } from 'sanity';

export const contactSettings = defineType({
  name: 'contactSettings',
  title: 'Contact Settings',
  type: 'document',
  fields: [
    defineField({ name: 'submitLabel', title: 'Submit button label', type: 'string' }),
    defineField({ name: 'successMessage', title: 'Success message', type: 'string' }),

    defineField({ name: 'nameLabel', title: 'Name label', type: 'string' }),
    defineField({ name: 'namePlaceholder', title: 'Name placeholder', type: 'string' }),

    defineField({ name: 'emailLabel', title: 'Email label', type: 'string' }),
    defineField({ name: 'emailPlaceholder', title: 'Email placeholder', type: 'string' }),

    defineField({ name: 'messageLabel', title: 'Message label', type: 'string' }),
    defineField({ name: 'messagePlaceholder', title: 'Message placeholder', type: 'string' }),
  ],
});