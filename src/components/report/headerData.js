const headers = [
  {
    title: 'Name',
    key: 'name',
    sort: [
      {
        key: 'aToZ',
        title: 'A-Z',
        type: 'asc',
      },
      {
        key: 'zToA',
        title: 'Z-A',
        type: 'desc',
      },
    ],
  },
  {
    title: 'Rating',
    key: 'rating',
    sort: [
      {
        key: 'highest',
        title: 'Highest',
        type: 'asc',
        nullishSort: true,
      },
      {
        key: 'lowest',
        title: 'Lowest',
        type: 'desc',
        nullishSort: true,
      },
    ],
  },
  {
    title: 'Review Count',
    key: 'reviewCount',
    sort: [
      {
        key: 'highest',
        title: 'Highest',
        type: 'asc',
      },
      {
        key: 'lowest',
        title: 'Lowest',
        type: 'desc',
      },
    ],
  },
  {
    title: 'Size (MB)',
    key: 'size',
    sort: [
      {
        key: 'highest',
        title: 'Highest',
        type: 'asc',
        nullishSort: true,
      },
      {
        key: 'lowest',
        title: 'Lowest',
        type: 'desc',
        nullishSort: true,
      },
    ],
  },
  {
    title: 'Type',
    key: 'type',
  },
  {
    title: 'Price',
    key: 'price',
    sort: [
      {
        key: 'highest',
        title: 'Highest',
        type: 'asc',
      },
      {
        key: 'lowest',
        title: 'Lowest',
        type: 'desc',
      },
    ],
  },
  {
    title: 'Category',
    key: 'category',
  },
  {
    title: 'Content',
    key: 'contentRating',
  },
  {
    title: 'Genre',
    key: 'genre',
  },
  {
    title: 'Updated At',
    key: 'updatedAt',
    sort: [
      {
        key: 'latest',
        title: 'Latest',
        type: 'asc',
      },
      {
        key: 'oldest',
        title: 'Oldest',
        type: 'desc',
      },
    ],
  },
];

export default headers;
