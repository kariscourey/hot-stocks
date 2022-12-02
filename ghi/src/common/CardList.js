import * as React from 'react';
import { SimpleCard } from './SimpleCard';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';


export function CardList(props) {

  const cards = props.cards;
  const type = props.type;

  return (
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
              { type == 'SEARCH' ?
                <SimpleCard card={card} /> :
                card.preference ?
                <SimpleCard card={card} type={type} /> :
                  <></>
                }
              </Grid>
            ))}
          </Grid>
        </Container>
  );
}
