import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { ContentCard } from './ContentCard';
import { Copyright } from '../../common/Copyright';
import { InfoDialog } from '../../common/InfoDialog';
import { PortfolioDialog } from '../../common/PortfolioDialog';
import { useGetNewsItemsQuery } from '../../rtk-files/newsItemsApi';


export function Explore() {

    const theme = createTheme();

    const { data: newsItemsData, isLoading: newsItemsLoading } = useGetNewsItemsQuery();
    const { queries } = useSelector(state => state.stocks);
    const { portfolioDialog } = useSelector(state => state.portfolioDialog);
    const { infoDialog } = useSelector(state => state.infoDialog);

    return (
        <>
            {
                portfolioDialog ?
                    <PortfolioDialog /> :
                    <></>
            }
            {
                infoDialog ?
                    <InfoDialog /> :
                    <></>
            }
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        {/* <ErrorNotification error={error} /> */}
                        <>
                            {newsItemsLoading ?
                                'Loading...' :
                                newsItemsData && queries[`getStocks(undefined)`]?.data?.stocks ?
                                    <ContentCard cards={queries[`getStocks(undefined)`]?.data?.stocks.concat(newsItemsData.news_items)} /> :
                                    <></>
                            }
                        </>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
        </>
    );

}