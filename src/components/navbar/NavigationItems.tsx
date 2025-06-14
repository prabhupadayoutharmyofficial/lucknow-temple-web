
export const getLeftNavItems = () => [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Darshan', path: '/darshan' },
  { name: 'Events', path: '/events' },
  { name: 'Gallery', path: '/gallery' },
];

export const getRightNavItems = (user: any) => {
  const items = [
    { name: 'Visit', path: '/visit' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Donate', path: '/donate' },
    { name: 'Contact', path: '/contact' },
  ];

  if (!user) {
    items.push({ name: 'Sign In', path: '/auth' });
  }

  return items;
};

export const getAllNavItems = (user: any) => [...getLeftNavItems(), ...getRightNavItems(user)];
