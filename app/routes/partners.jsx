// {
//     metaobjects(type: "partners") {
//       edges {
//         node {
//           partner_name
//           partner_logo
//           partner_website_url
//         }
//       }
//     }
//   }

const DINAMIC_SECTION_QUERY = `#graphql
query Section Dinamique{
  metaobjects(first:250, type:"partenaires"){
    nodes{id
   Name: field(key:"partner_name"){
      value
    }
   LogoImage: field(key:"partner_logo"){
      value
    }
   Url: field(key:"partner_website_url"){
      value
    }
    }
  }
}`;
