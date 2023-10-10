import {
  Page,
  Layout,
  LegacyCard,
  ResourceList,
  Thumbnail,
  Text,
  Card,
  HorizontalStack,
  VerticalStack,
  InlineError,
  Button,
} from "@shopify/polaris";
import { useLoaderData } from "@remix-run/react";
import { ImageMajor } from "@shopify/polaris-icons";
import { useEffect, useState } from "react";

export default function Tools() {
  // const products = useLoaderData().formattedProducts;
  const [formState, setFormState] = useState({
    productId: "",
    productVariantId: "",
    productTitle: "",
    productHandle: "",
    productAlt: "",
    productImage: "",
  });
  // console.log(products, "nofal");

  useEffect(() => {
    console.log(formState, "formState");
  }, []);

  async function selectProduct() {
    const products = await window.shopify.resourcePicker({
      type: "product",
      action: "select", // customized action verb, either 'select' or 'add',
    });

    if (products) {
      const { images, id, variants, title, handle } = products[0];

      // setFormState({
      //   ...formState,
      //   productId: id,
      //   productVariantId: variants[0]?.id,
      //   productTitle: title,
      //   productHandle: handle,
      //   productAlt: images[0]?.altText,
      //   productImage: images[0]?.originalSrc,
      // });
    }
  }
  // [START save]

  function handleSave() {
    const data = {
      productId: formState.productId || "",
      productVariantId: formState.productVariantId || "",
      productHandle: formState.productHandle || "",
    };
  }
  // [END save]
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section oneThird>
          <LegacyCard title="Recommendation" actions={[{ content: "Save" }]}>
            <LegacyCard.Section>
              <Text color="subdued" as="span">
                Using Title
              </Text>
            </LegacyCard.Section>
            <LegacyCard.Section title="">
              <div style={{ display: "flex", gap: "10px" }}>
                <div>
                  <Thumbnail
                    source="https://d3emlu4sl5epij.cloudfront.net/evmshopifyapps/wiser/showalsoboughtproduct.png"
                    alt="Black orange scarf"
                  />
                </div>
                <div style={{ justifyContent: "center" }}>
                  Shows the products related and inspired by the entire browsing
                  session of a visitor. Products which are related to the
                  recently visited products by a visitor.
                </div>
              </div>
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>

        <Layout.Section oneThird>
          <Card>
            <VerticalStack gap="5">
              {/* [START product] */}
              <HorizontalStack align="space-between">
                <Text as={"h2"} variant="headingLg">
                  Product
                </Text>
                {formState.productId ? (
                  <Button plain onClick={selectProduct}>
                    Change product
                  </Button>
                ) : null}
              </HorizontalStack>
              {formState.productId ? (
                <HorizontalStack blockAlign="center" gap={"5"}>
                  <Thumbnail
                    source={formState.productImage || ImageMajor}
                    alt={formState.productAlt}
                  />
                  <Text as="span" variant="headingMd" fontWeight="semibold">
                    {formState.productTitle}
                  </Text>
                </HorizontalStack>
              ) : (
                <VerticalStack gap="2">
                  <Button onClick={selectProduct} id="select-product">
                    Select product
                  </Button>
                </VerticalStack>
              )}
              {/* [END product] */}
            </VerticalStack>
          </Card>
        </Layout.Section>

        <Layout.Section oneThird>
          <LegacyCard title="Recommendation" actions={[{ content: "Save" }]}>
            <LegacyCard.Section>
              <Text color="subdued" as="span">
                Using product type
              </Text>
            </LegacyCard.Section>
            <LegacyCard.Section title="Items">
              <ResourceList
                resourceName={{ singular: "product", plural: "products" }}
                items={[
                  {
                    id: "345",
                    url: "#",
                    name: "Black & orange scarf",
                    sku: "9234194023",
                    quantity: "1230",
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                        alt="Black orange scarf"
                      />
                    ),
                  },
                  {
                    id: "260",
                    url: "#",
                    name: "Tucan scarf",
                    sku: "9234194010",
                    quantity: "701",
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                        alt="Tucan scarf"
                      />
                    ),
                  },
                ]}
                renderItem={(item) => {
                  const { id, url, name, sku, media, quantity } = item;

                  return (
                    <ResourceList.Item
                      id={id}
                      url={url}
                      media={media}
                      accessibilityLabel={`View details for ${name}`}
                    >
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {name}
                      </Text>
                      <div>SKU: {sku}</div>
                      <div>{quantity} available</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
