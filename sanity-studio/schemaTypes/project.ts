import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (r) => r.required().min(5),
    }),
    defineField({
      name: 'outcome',
      title: 'Outcome',
      type: 'text',
      rows: 3,
      validation: (r) => r.required().min(10),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 10,
    }),
  ],
})