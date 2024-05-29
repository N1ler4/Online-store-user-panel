import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

interface Item {
  image: string;
}

const items: Item[] = [
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgBe_hpfvNOHo15lP7jWgQcyNSWVi273MIdA&s",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiU7nngXVnFAZKk5b63umgQn0EEkIkWjt9EQ&s",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3e-rpzenbY1X-ForXYQLTGs6hWol6_qf9gA&s",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5AboJoFF5gC6xj-tMpaH1xeSGO93G5ivPzg&s",
  },
];

function ImageCarousel() {
  return (
    <Carousel
      autoPlay={true}
      interval={3000}
      indicators={true}
      navButtonsAlwaysVisible={true}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props: { item: Item }) {
  return (
    <Paper
      className="carousel-item"
      style={{
        height: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <img
        src={props.item.image}
        style={{
          width: "50%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
    </Paper>
  );
}

export default ImageCarousel;
