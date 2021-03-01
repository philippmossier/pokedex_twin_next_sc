import { useState } from 'react';
import { useRouter } from 'next/router';
import 'twin.macro';

import Navbar from '../../components/Navbar';
import DataLoader from '../../components/DataLoader';
import TypeBadge from '../../components/TypeBadge';
import StatBar from '../../components/StatBar';
import DropDownButton from '../../components/DropDownButton';

import {
  FlexContainer,
  Header,
  Number,
  ImageContainer,
  Image,
  DataTable,
  TableBody,
  StatsSection,
  Stat,
  StatLabel,
  MovesSection,
  MoveList,
  MoveItem,
} from '../../styles/DetailsPage.styles';
import { capFirstLetter } from '../../utils/capFirstLetter';
import { formatInto3Digits } from '../../utils/formatInto3Digits';
import { getListItem } from '../../repository/getListItem';
import { imgUrl } from '../../repository/urls';

const Details = () => {
  const { query, isReady } = useRouter();
  const [movesVisible, setMovesVisible] = useState(false);

  if (isReady) {
    return (
      <DataLoader fetchData={() => getListItem(query.id)} dependency={[query.id]}>
        {(data) => {
          console.log('data', data);
          return (
            <>
              <Navbar />

              <FlexContainer>
                <main>
                  <Header>
                    {capFirstLetter(data.details.name)}
                    <Number>{`#${data.details.id}`}</Number>
                  </Header>

                  <ImageContainer>
                    <Image src={`${imgUrl}/${formatInto3Digits(data.details.id)}.png`} />
                  </ImageContainer>

                  <DataTable>
                    <TableBody>
                      <tr>
                        <th>Abilities</th>
                        {data.details.abilities.map((ab) => (
                          <td tw="px-3" key={ab.ability.name}>
                            {ab.ability.name}
                          </td>
                        ))}
                      </tr>

                      <tr>
                        <th>Type</th>
                        {data.details.types.map((ty) => (
                          <td tw="px-3" key={ty.type.name}>
                            <TypeBadge color={ty.type.name}>{ty.type.name}</TypeBadge>
                          </td>
                        ))}
                      </tr>

                      <tr>
                        <th>Possible Evolutions</th>
                        {data.evolution.chain.evolves_to.length &&
                        data.details.name === data.evolution.chain.species.name ? (
                          <>
                            <td tw="px-3">{data.evolution.chain.evolves_to[0].species.name}</td>
                            <td tw="px-3">{data.evolution.chain.evolves_to[0].evolves_to[0]?.species.name}</td>
                          </>
                        ) : null}
                        {data.evolution.chain.evolves_to.length &&
                        data.details.name === data.evolution.chain.evolves_to[0].species.name ? (
                          <td tw="px-3">{data.evolution.chain.evolves_to[0].evolves_to[0]?.species.name}</td>
                        ) : null}
                      </tr>
                    </TableBody>
                  </DataTable>

                  <StatsSection>
                    {data.details.stats.map((st, index) => (
                      <Stat key={st.stat.name}>
                        <StatLabel>{st.stat.name}</StatLabel>

                        <StatBar barWidth={st.base_stat} index={index}>
                          {st.base_stat}
                        </StatBar>
                      </Stat>
                    ))}
                  </StatsSection>

                  <MovesSection>
                    <DropDownButton onClick={() => setMovesVisible(!movesVisible)}>Moves</DropDownButton>
                    {movesVisible && (
                      <MoveList>
                        {data.details.moves.map((mo) => (
                          <MoveItem key={mo.move.name}>{mo.move.name}</MoveItem>
                        ))}
                      </MoveList>
                    )}
                  </MovesSection>
                </main>
              </FlexContainer>
            </>
          );
        }}
      </DataLoader>
    );
  }
  return null;
};
export default Details;
