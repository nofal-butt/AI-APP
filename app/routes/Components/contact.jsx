import {
  Page,
  Layout,
  LegacyCard,
  Form,
  FormLayout,
  TextField,
  Button,
  Icon,
} from "@shopify/polaris";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { EmailMajor } from "@shopify/polaris-icons";
import { useState, useCallback, useEffect } from "react";
import emailjs from "@emailjs/browser";

const murchantJson = async ({ session }) => {
  console.log(session, "hallo");
  const murchantUrl = `https://${session.shop}/admin/api/2023-07/shop.json`;
  try {
    const murchantData = await fetch(murchantUrl, {
      method: "GET",
      headers: {
        "X-Shopify-Access-Token": session.accessToken || "",
        "Content-Type": "application/json",
      },
    });
    const murchantJson = await murchantData.json();
    console.log(murchantJson, "Merchant Data");
    return json({ murchantJson });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default function Contact() {
  const { session } = useLoaderData();
  console.log(session, "nofal");

  useEffect(() => {
    murchantJson();
    console.log(data, "loader");
  }, []);

  const shopData = {};

  const [isloading, setIsloading] = useState(false);
  const [data, setData] = useState({
    StoreURL: shopData?.myshopify_domain,
    email: shopData?.email ? shopData?.email : "",
    name: shopData?.shop_owner ? shopData?.shop_owner : "",
    Message: "",
  });

  const handleTextFieldChange = useCallback((value, name) => {
    setData((predata) => ({
      ...predata,
      [name]: value,
    }));
  }, []);

  // --------- EMAIL SEND FUNCTION ------------ //
  const Temp_data = {
    name: data?.name,
    email: data?.email,
    message: data?.Message,
    storeURL: data?.StoreURL,
  };
  const handleSubmit = () => {
    setIsloading(true);
    console.log(data);
    emailjs
      .send(
        "service_yjcqrtu",
        "template_4wa0j1q",
        // form.current,
        Temp_data,
        "eW7l2ESazG1rYh2VL"
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response);
        shopify.toast.show("Message Sent Successfully");
        setIsloading(false);
      })
      .catch((error) => {
        console.log("FAILED...", error);
        shopify.toast.show("Message Not Sent");
        setIsloading(false);
      });
  };
  //     // --------- EMAIL FUNCTION END ------------ //

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <Page narrowWidth>
        <Layout>
          <Layout.Section>
            <LegacyCard sectioned>
              <div>
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                    marginTop: "2rem",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#050505",
                  }}
                >
                  <span
                    style={{
                      marginRight: "1rem",
                      backgroundColor: "#d7ede7",
                      padding: "7px",
                      width: "30px",
                      height: "30px",
                      borderRadius: "7px",
                    }}
                  >
                    <Icon source={EmailMajor} color="success" />
                  </span>
                  <div>HOW CAN WE HELP YOU?</div>
                </div>
              </div>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                By leaving your information, we can support you all the way.
              </div>
              <Form method="post" onSubmit={handleSubmit}>
                <FormLayout>
                  <TextField
                    type="url"
                    label="Store URL:"
                    value={"http://" + data?.StoreURL}
                    onChange={(value) =>
                      handleTextFieldChange(value, "StoreURL")
                    }
                    autoComplete="off"
                    requiredIndicator
                    disabled
                  />

                  <TextField
                    type="text"
                    label="Your Name:"
                    value={data?.name}
                    onChange={(value) => handleTextFieldChange(value, "name")}
                    autoComplete="off"
                  />
                  <TextField
                    label="Email Address:"
                    type="email"
                    value={data?.email}
                    onChange={(value) => handleTextFieldChange(value, "email")}
                    autoComplete="email"
                    requiredIndicator
                  />
                  <TextField
                    type="text"
                    label="Message"
                    value={data?.Message}
                    onChange={(value) =>
                      handleTextFieldChange(value, "Message")
                    }
                    placeholder="Leave your message"
                    multiline={5}
                    autoComplete="off"
                    requiredIndicator
                  />
                  <Button primary submit loading={isloading}>
                    Send Email
                  </Button>
                </FormLayout>
              </Form>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
}
