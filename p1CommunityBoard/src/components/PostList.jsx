const PostList = ({ books }) => {
    // If no books are passed in, use default sample books
    const defaultBooks = [
      {
        id: 1,
        title: 'As Long as the Lemon Trees Grow',
        author: 'Zoulfa Katouh',
        description:
          'A haunting story set in Syria about love, loss, and revolution. Beautiful, emotional, and unforgettable.',
        link: 'https://www.goodreads.com/book/show/57390604-as-long-as-the-lemon-trees-grow',
      },
      {
        id: 2,
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        description:
          'A timeless novel about a young shepherd who journeys to find his personal legend and the treasures life holds.',
        link: 'https://www.goodreads.com/book/show/865',
      },
      {
        id: 3,
        title: 'The Henna Artist',
        author: 'Alka Joshi',
        description:
          'Set in 1950s Jaipur, this vibrant tale follows a woman who builds an independent life through her craft as a henna artist.',
        link: 'https://www.goodreads.com/book/show/50607466-the-henna-artist',
      },
      {
        id: 4,
        title: 'The Book Thief',
        author: 'Markus Zusak',
        description:
          'A young girl living in Nazi Germany finds solace in books during the horrors of World War II.',
        link: 'https://www.goodreads.com/book/show/19063.The_Book_Thief',
      },
      {
        id: 5,
        title: 'Educated',
        author: 'Tara Westover',
        description:
          'A memoir about a woman who grows up in a strict and abusive household in rural Idaho but eventually escapes to learn about the wider world through education.',
        link: 'https://www.goodreads.com/book/show/35133922-educated',
      },
      {
        id: 6,
        title: 'Becoming',
        author: 'Michelle Obama',
        description:
          'The former First Lady’s inspiring memoir about her life, values, and time in the White House.',
        link: 'https://www.goodreads.com/book/show/38746485-becoming',
      },
      {
        id: 7,
        title: 'The Night Circus',
        author: 'Erin Morgenstern',
        description:
          'A magical competition between two young illusionists that unfolds in a mysterious traveling circus.',
        link: 'https://www.goodreads.com/book/show/9361589-the-night-circus',
      },
      {
        id: 8,
        title: 'The Hate U Give',
        author: 'Angie Thomas',
        description:
          'A powerful story about race and justice seen through the eyes of a teenage girl after witnessing a police shooting.',
        link: 'https://www.goodreads.com/book/show/32075671-the-hate-u-give',
      },
      {
        id: 9,
        title: 'Circe',
        author: 'Madeline Miller',
        description:
          'A retelling of the story of Circe, the enchantress from Greek mythology, exploring her struggles and powers.',
        link: 'https://www.goodreads.com/book/show/35959740-circe',
      },
      {
        id: 10,
        title: 'Sapiens: A Brief History of Humankind',
        author: 'Yuval Noah Harari',
        description:
          'An exploration of the history of humanity from the Stone Age to the modern age, blending history and science.',
        link: 'https://www.goodreads.com/book/show/23692271-sapiens',
      },
    ];
  
    const displayBooks = books.length > 0 ? books : defaultBooks;
  
    return (
        <div className="card-list">
        {displayBooks.map((book) => (
          <div key={book.id} className="card">
            <h3>{book.title}</h3>
            <p><em>by {book.author}</em></p>
            <p>{book.description}</p>
            {book.link && (
              <a href={book.link} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  export default PostList;
  