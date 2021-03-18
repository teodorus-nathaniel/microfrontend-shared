const routes: {
  [key: string]: {
    path: string
    desc: { name: string; target?: string }[]
  }
} = {
  // HOME
  Home: {
    path: '/',
    desc: [{ name: 'Home' }],
  },
  // UPLOAD
  Upload: {
    path: '/upload',
    desc: [{ name: 'Upload' }],
  },
  // CUSTOMERS
  Customers: {
    path: '/customers',
    desc: [{ name: 'Customers' }],
  },
  'Customer Details': {
    path: '/customers/:id',
    desc: [
      { name: 'Customer Profiles', target: '/customers' },
      { name: 'Details' },
    ],
  },
  // AML
  AML: {
    path: '/aml',
    desc: [{ name: 'AML Report' }],
  },
  'AML Manual': {
    path: '/aml-manual',
    desc: [{ name: 'Manual AML Reporting' }],
  },
  // SCENARIO
  'Manage Scenario': {
    path: '/manage-scenario',
    desc: [{ name: 'Scenarios' }],
  },
}

export default routes
