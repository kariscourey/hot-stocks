import { useState, useEffect, useSelector } from 'react';
import * as React from 'react';
import { portfolioStocksApi, useGetPortfolioStocksQuery } from '../rtk-files/portfolioStocksApi';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import QuoteAndChart from '../portfolio/QuoteAndChart';
import { getTotalPortfolioValue } from '../portfolio/GetTotalPortfolioValue';
import { SimpleCard } from '../common/SimpleCard';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { CardList } from '../common/CardList';
import { Copyright } from '../common/Copyright';
import { ErrorNotification } from '../common/ErrorNotification';
import { CssBaseline } from '@mui/material';
const theme = createTheme();
export function Portfolio() {
    // const { portfolio } = useSelector(state => state.local)
    // const [getTotalPortfolioValue, setTotalPortfolioValue] = useState(0);
    // useEffect(() => {
    //     if(portfolio.length > 0) {
    //         setTotalPortfolioValue(getTotalPortfolioValue(portfolio));
    //     }
    // }, [portfolio]);
  const { data: portfolioStocks, error, isLoading: portfolioLoading } = useGetPortfolioStocksQuery();
//   if (isLoading) {
//     return (
//       <CircularProgress color="inherit" />
//     );
//   }
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: -6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <ErrorNotification error={error} />
              {
                portfolioLoading ?
                  <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container sx={{ mx: 40 }}>
                      <CircularProgress />
                    </Grid>
                  </Container> :
                portfolioStocks ?
                  <CardList cards={portfolioStocks.portfolio_stocks} /> :
                <></>
              }
            </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
//     <div>
//       <Alert variant="outlined" severity="error">
//                 {error}
//             </Alert>
//             <div>
//                 {data.portfolioStocks.map(portfolioStock => {
//                     <p key={portfolioStock.id}>
//                         {portfolioStock.symbol}
//                     </p>
//                 })}
//             </div>
//     </div>
//   );
// }
