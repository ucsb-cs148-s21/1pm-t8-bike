// the place where all of the forum stuff is stored
var defaultThreads = [
  {
    //1st post
    id: 1,
    title: "Thread 1",
    category: "Announcement",
    author: "First",
    date: Date.now(),
    content: "Thread content",
    comments: [
      {
        author: "Joe",
        date: Date.now(),
        content: "First comment",
      },
      {
        author: "Momma",
        date: Date.now(),
        content: "Second comment",
      },
    ], //end comments
  },
  {
    // 2nd post
    id: 2,
    title: "Thread 2",
    category: "Lost and Found",
    author: "Second",
    date: Date.now(),
    content: "Thread content",
    comments: [
      {
        author: "Joe2",
        date: Date.now(),
        content: "First comment2",
      },
      {
        author: "Momma2",
        date: Date.now(),
        content: "Second comment2",
      },
    ], //end comments
  },
];

var threads = defaultThreads;
export { threads };
