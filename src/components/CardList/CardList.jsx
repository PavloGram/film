// import { useMatch } from "react-router";
import Pagination from "../../UI/Pagination/Pagination";
import { genres } from "../../js/genres";

import {
  Card,
  CardItem,
  CardThumb,
  CardImage,
  CardTitle,
  CardDiscriptionBlock,
  CardDiscriptionList,
  CardDiscriptionItem,
  CardDiscriptionText,
  candyCane,
} from "./CardListStyle";
import { useDispatch, useSelector } from "react-redux";
import { changeFilm } from "../../rtk/reducers/currentFilm";
import { changeStateActive } from "../../rtk/reducers/isActiveModal";

function CardList() {
  const responseData = useSelector((state) => state.responseData.value);
  const value = Array.isArray(responseData) ? responseData : responseData?.results
  const dispatch = useDispatch();
  // const match = useMatch("/");
  // const cureentFilmsArrey = !match ? filmsById : film

  return (
    <>
      <Card>
        {value.map((el) => (
          <CardItem
            key={el.id}
            onClick={() => {
              dispatch(changeFilm(el));

              dispatch(changeStateActive());
            }}
          >
            <CardThumb>
              <div>
                <CardImage
                  loading="lazy"
                  src={
                    el.poster_path
                      ? `https://image.tmdb.org/t/p/w500${el.poster_path}`
                      : candyCane
                  }
                />{" "}
              </div>
              <CardTitle>{el.title}</CardTitle>
              <CardDiscriptionBlock>
                <CardDiscriptionList>
                  {genres
                    .filter((e) => {
                      if (el.genre_ids?.includes(e.id)) {
                        return e;
                      } else {
                        return null;
                      }
                    })
                    .slice(0, 2)
                    .map((et, index) => (
                      <CardDiscriptionItem key={et.id}>
                        <CardDiscriptionText>
                          {Number(el.genre_ids.length) !== 1 && index !== 1
                            ? `${et.genre}, `
                            : ` ${et.genre} |`}
                        </CardDiscriptionText>
                      </CardDiscriptionItem>
                    ))}
                </CardDiscriptionList>
                <CardDiscriptionText>
                  {el.release_date && el.release_date.slice(0, 4)}
                </CardDiscriptionText>
              </CardDiscriptionBlock>
            </CardThumb>
          </CardItem>
        ))}
      </Card>
      <Pagination />
    </>
  );
}

export default CardList;