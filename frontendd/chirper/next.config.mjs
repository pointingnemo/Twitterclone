/** @type {import('next').NextConfig} */
// const nextConfig = {

//     images:{
//         domains:['localhost','via.placeholder.com','res.cloudinary.com']
//     }
// };

// export default nextConfig;



const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
        },
        {
          protocol: 'https',
          hostname: 'via.placeholder.com',
        },
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          pathname: '**'
        },
      ],
    },
  };
  
  export default nextConfig;
  