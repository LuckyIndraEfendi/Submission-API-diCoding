const Hapi = require("@hapi/hapi");
const Booksroutes = require("./routes/Booksroutes");

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
    routes: {
      validate: {
        failAction: async (request, h, err) => {
          throw err;
        },
      },
    },
  });

  server.route(Booksroutes);

  await server.start();
  console.log("Server running on port 9000");
};

init();
