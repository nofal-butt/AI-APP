import { useState, useCallback, useEffect } from "react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { LegacyCard, LegacyTabs } from "@shopify/polaris";
import Response from "mongooes/mongoSchema";
import { authenticate } from "../shopify.server";
import Contact from "app/routes/Components/contact";
import About from "app/routes/Components/About";
import Home from "app/routes/Components/Home";
import Tools from "app/routes/Components/Tools";

export async function loader({ request }) {
  const { session } = await authenticate.admin(request);
  console.log(session, "session");
  const token = session.accessToken;
  console.log(token, "token");
  const shop = session.shop;

  // const murchantUrl = `https://${shop}/admin/api/2023-07/shop.json`;

  // try {
  //   // const murchantData = await fetch(murchantUrl, requestOptions);
  //   const murchantData = await fetch(murchantUrl, {
  //     method: "GET",
  //     headers: {
  //       "X-Shopify-Access-Token": token || "",
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const murchantJson = await murchantData.json();

  //   console.log(murchantJson, "Merchant Data");

  //   return json({ murchantJson });
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  // }

  const getAllProducts = async (first, after) => {
    const query = `
        query GetProducts($first: Int, $after: String) {
          products(first: $first, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              cursor
              node {
                id
                title
                status
                tags
                handle
                images(first: 10) {
                  edges {
                    node {
                      id
                      src
                    }
                  }
                }
              }
            }
          }
        }
      `;

    // API request logic
    const url = `https://${shop}/admin/api/2021-07/graphql.json`;

    const data = await fetch(url, {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": token || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { first, after } }),
    });
    const result = await data.json();
    console.log(result, "result");
    if (!result.data) {
      console.error("No data in result", result);
      return json({ products: [] });
    }

    const { pageInfo, edges } = result.data.products;
    console.log(pageInfo, "pageInfo");
    return edges;
  };

  let allImageDetails = [];
  const products = await getAllProducts(75);
  console.log(products, "products");
  // console.log(products[0].node.images.edges, "images");

  for (let i = 0; i < products.length; i++) {
    const product = products[i].node;
    const images = product.images.edges;
    // console.log(images, "images1");
    for (let j = 0; j < images.length; j++) {
      const image = images[j].node;
      // console.log(image, "images1");

      const imageDetails = {
        productId: product.id,
        productTitle: product.title,
        productStatus: product.status,
        productTags: product.tags,
        productHandle: product.handle,
        imageId: image.id,
        imageUrl: image.src,
      };

      // Add this object to the allImageDetails array
      allImageDetails.push(imageDetails);
    }
  }
  console.log(allImageDetails.length, "allImageDetails");
  return json({ allImageDetails, session });
}

export default function Index() {
  useEffect(() => {
    loader();
  }, []);

  // [START select-product]

  // const products = useLoaderData().formattedProducts;
  // console.log(products, "nofal");

  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "home",
      content: "Home",
      panelID: "selected-home",
       components: <Home />
    },
    // {
    //   id: "Tools",
    //   content: "Tools",
    //   panelID: "selected-tool",
    //   components: <Tools />,
    // },
    {
      id: "About Us",
      content: "About Us",
      panelID: "selected-AboutUs",
      components: <About />,
    },
    {
      id: "Contact",
      content: "Contact Us",
      panelID: "selected-Contact",
      components: <Contact />,
    },
    // {
    //   id: 'Pricing',
    //   content: 'Pricing',
    //   panelID: 'selected-Pricing',
    //   components: ""
    // },
  ];
  const selectedTab = tabs[selected];
  return (
    <>
      <LegacyCard>
        <LegacyTabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          <LegacyCard.Section key={selectedTab.id}>
            {selectedTab.components}
          </LegacyCard.Section>
        </LegacyTabs>
      </LegacyCard>
    </>
  );
}
