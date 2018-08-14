require('dotenv').config()
const { createClient } = require('contentful-management')
const accessToken = process.env.CONTENTFUL_PERSONAL_ACCESS_TOKEN

const MvboaSpaceId = 'ykxbh0sg3lft'
const ContentfulEnvironment = 'master'

const contentfulClient = createClient({ accessToken })
const toDate = require('date-fns/toDate')
const format = require('date-fns/format')
const DATE_FORMAT = 'YYYY-MM-dd'

const Airtable = require('airtable')

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.airtable_api_key,
})
const airtableBase = Airtable.base('appiAF1stoYD2RvqC')

const loadMembers = async () => {
  const members = []
  await airtableBase('members')
    .select({
      view: 'member grid view',
      maxRecords: 1000,
      sort: [
        {
          field: 'ROLE',
          direction: 'desc',
        },
        {
          field: 'LAST',
          direction: 'asc',
        },
      ],
    })
    .eachPage(function page(records, nextPg) {
      records.forEach(r => {
        members.push({
          id: r.id,
          name: r.get('NAME'),
          first: r.get('FIRST'),
          last: r.get('LAST'),
          memberClass: r.get('CLASS'),
          role: r.get('ROLE'),
          permit: r.get('PERMIT'),
          // lastUpdate: admin.firestore.FieldValue.serverTimestamp(),
        })
      })

      nextPg()
    })
  return members
}

const loadLinks = async () => {
  const links = []
  await airtableBase('links')
    .select({
      view: 'Grid view',
      maxRecords: 1000,
      sort: [{ field: 'title', direction: 'asc' }],
    })
    .eachPage(function page(records, nextPg) {
      records.forEach(r => {
        links.push({
          id: r.id,
          url: r.get('url'),
          title: r.get('title'),
          // lastUpdate: admin.firestore.FieldValue.serverTimestamp(),
        })
      })
      nextPg()
    })
  return links
}

const loadEvents = async () => {
  const events = []
  await airtableBase('events')
    .select({ view: 'Grid view' })
    .eachPage(function page(records, nextPg) {
      records.forEach(r => {
        events.push({
          id: r.id,
          title: r.get('Title'),
          description: r.get('Description'),
          date: toDate(r.get('Date')),
          // lastUpdate: admin.firestore.FieldValue.serverTimestamp(),
        })
      })
      nextPg()
    })
  return events
}

// contentfulClient
//   .getSpace(MvboaSpaceId)
//   .then(space => space.getEnvironment('master'))
//   .then(environment => environment.getEntries({ content_type: 'member' }))
//   .then(({ items }) => {
//     for (let item of items) {
//       const {
//         fields: { firstName, lastName, memberClass, permitNumber, role },
//       } = item
//       console.log({
//         firstName,
//         lastName,
//         memberClass,
//         permitNumber,
//         role,
//         // url: url['en-US'],
//         // title: title['en-US'],
//         // description: description['en-US'],
//       })
//     }
//   })
//   .then(() => {})
//   .catch(console.error)

async function loadContentful() {
  const space = await contentfulClient.getSpace(MvboaSpaceId)
  return space.getEnvironment(ContentfulEnvironment)
}
async function uploadEntries(environment, type, data, mapping) {
  //createEntry
  const mappedEntries = data.map(sourceItem => {
    const target = {}
    mapping.forEach(row => {
      const sourceField = row[0]
      const targetField = row[1]
      const transform = row.length > 2 ? row[2] : null
      const sourceValue = sourceItem[sourceField]
      // console.log('sourceValue::', sourceValue)
      if (typeof sourceValue !== 'undefined') {
        target[targetField] = {
          'en-US': !transform ? sourceValue : transform(sourceValue),
        }
      }
    })
    return { fields: target }
  })
  // console.log('** mapped entries **')
  // console.log(
  //   JSON.stringify({ mappedEntries: mappedEntries.slice(0, 10) }, null, 2),
  // )

  const entryPromises = mappedEntries.map(entry => {
    environment.createEntry(type, entry)
  })
  const entries = Promise.all(entryPromises)
  console.log('** entry results **')
  console.log(JSON.stringify(entries, null, 2))
}

async function main() {
  const _contentfulEnv = loadContentful()
  // const _events = loadEvents()
  // const _links = loadLinks()
  const _members = loadMembers()
  const [
    contentfulEnv,
    // events,
    // links,
    members,
  ] = await Promise.all([
    _contentfulEnv,
    // _events,
    // _links,
    _members,
  ])
  // console.log(
  //   JSON.stringify(
  //     {
  //       // events,
  //       // links,
  //       members: members.slice(0, 6),
  //     },
  //     null,
  //     2,
  //   ),
  // )
  members.forEach(m =>
    console.log(`last: ${m.last}, memberClass: ${m.memberClass}`),
  )

  // save events to contentful
  //uploadEntries(contentfulEnv, 'event', events, [
  // source(airtable) / target(contentful)
  /*['title', 'title'],
    ['description', 'description'],
    ['date', 'eventDate', source => format(source, DATE_FORMAT)],
    */
  //])
  // uploadEntries(contentfulEnv, 'member', members, [
  //   ['first', 'firstName'],
  //   ['last', 'lastName'],

  //   ,
  //   ['memberClass', 'memberClass', source => parseInt(source)],
  //   ,
  //   ['permit', 'permitNumber'],

  //   ,
  //   ['role', 'role'],
  //   ,
  // ])
}
main()
