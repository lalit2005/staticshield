const theme = {
  type: 'Custom',
  palette: {
    successLight: '#15f085',
  },
};

export default theme;
/***
 *  Usage::
 *
 *  export const App = () => {
 *    return (
 *      <GeistProvider themes={[myTheme]} themeType="Custom">
 *        <CssBaseline />
 *        <YourComponent />
 *      </GeistProvider>
 *    )
 *  }
 **/
