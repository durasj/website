 const mockProjects = [
    {
        id: 'something',
        title: 'Something',
        type: 'commercial',
        archived: false,
        color: 'blue',
        description: 'Something nice',
        period: '2222',
        skills: ['all', 'right', 'skills'],
        photos: [
            { src: '/google/random.jpg', caption: 'Random photo I found on Google' },
            { src: '/google/funny.jpg', caption: 'Funny image from Google' },
        ],
        link: 'https://google.com',
        linkLabel: 'My weekend project',
    },
    {
        id: 'else',
        title: 'Else',
        type: 'commercial',
        archived: true,
        color: 'grey',
        description: 'Something archived',
        period: '2009',
        skills: ['all', 'wrong', 'skills'],
        photos: [
            { src: '/quality.jpg', caption: 'Low quality photo' },
        ],
    },
    {
        id: 'charity',
        title: 'Charity work',
        type: 'noncommercial',
        archived: false,
        color: 'white',
        description: 'Pro bono stuff',
        period: '2019',
        skills: ['only', 'pure', 'skills'],
        photos: [
            { src: '/kind.jpg', caption: 'Kind people at charity' },
        ],
    },
    {
        id: 'other-charity',
        title: 'Other charity',
        type: 'noncommercial',
        archived: true,
        color: 'black',
        description: 'Just Another pro bono stuff',
        period: '2000',
        skills: ['some', 'older', 'skills'],
    },
];

export default mockProjects;
