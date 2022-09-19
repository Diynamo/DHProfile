import mock from '../mock';

const LinksData = [
  {
    id: 1,
    label:'website',
    url: null,
    deleted: false,
  },
  {
    id: 2,
    label:'twitter',
    url: null,
    deleted: false,
  },
  {
    id: 3,
    label:'instagram',
    url: null,
    deleted: false,
  },
];
mock.onGet('/api/data/links/LinksData').reply(() => [200, LinksData]);
export default LinksData;