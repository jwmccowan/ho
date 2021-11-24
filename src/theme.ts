import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Container: {
      defaultProps: {
        maxW: "container.md",
      },
    },
  },
});

export default theme;
