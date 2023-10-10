
import {Card, Divider, Text, VerticalStack, CalloutCard} from '@shopify/polaris';
import tag from "../../../public/discount.png"

export default function Home() {
  return (
<>

       <CalloutCard
                title="Recommanded App"
                illustration={tag}
                primaryAction={{
                    content: 'Customize checkout',
                    url: '#',
                }}
            >
                <p>The app's ability to adapt and learn from new data ensures that the recommendations stay relevant, even as customer preferences evolve. This has been a game-changer in keeping my product offerings in line with what my audience truly desires.</p>
            </CalloutCard>
        {/* <Divider />
        <Text as="h1" variant="headingXs">
          Border
        </Text>
        <Divider borderColor="border" />
        <Text as="h1" variant="headingXs">
          Border inverse
        </Text>
        <Divider borderColor="border-inverse" />
        <Text as="h1" variant="headingXs">
          Transparent
        </Text>
        <Divider borderColor="transparent" /> */}
    
</>
  );
}



// import { MediaCard, VideoThumbnail, CalloutCard } from '@shopify/polaris';
// import React from 'react';

// export default function Home() {
//     return (
//         <>

//             <CalloutCard
//                 title="Customize the style of your checkout"
//                 illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
//                 primaryAction={{
//                     content: 'Customize checkout',
//                     url: '#',
//                 }}
//             >
//                 <p>Upload your store’s logo, change colors and fonts, and more.</p>
//             </CalloutCard>



//             <MediaCard
//                 portrait
//                 title="Turn your side-project into a business"
//                 primaryAction={{
//                     content: 'Learn more',
//                     onAction: () => { },
//                 }}
//                 description="In this course, you’ll learn how the Kular family turned their mom’s recipe book into a global business."
//                 popoverActions={[{ content: 'Dismiss', onAction: () => { } }]}
//             >
//                 <VideoThumbnail
//                     videoLength={80}
//                     thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
//                     onClick={() => console.log('clicked')}
//                 />
//             </MediaCard>
//         </>
//     );
// }