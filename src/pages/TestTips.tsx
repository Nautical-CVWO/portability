import React from 'react';
import Tips, { MediaDataSet } from './Tips';


const TestTips: React.FC = () => {
    

    return (
    <>
        <Tips uid={''} cards={[
            { media: 'BGM',
              title: "Card 1",
              description: "Desc 1",
              link: "https://www.google.com"
            },
            { media: 'BGM',
              title: "Card 1",
              description: "Desc 1",
              link: "https://www.google.com"
            },
            { media: 'BGM',
                title: "Card 1",
                description: "Desc 1",
                link: "https://www.google.com"
              },
              { media: 'BGM',
                title: "Card 1",
                description: "Desc 1",
                link: "https://www.google.com"
              }
        ]} />
    </>
    )


}

export default TestTips;