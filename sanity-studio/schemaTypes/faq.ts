import { defineField, defineType } from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (r) => r.required().min(5),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (r) => r.required().min(10),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 10,
      validation: (r) => r.min(0),
    }),
  ],
  preview: {
    select: { title: 'question' },
  },
});