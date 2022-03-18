import "./menu-item.styles.scss";

const MenuItem = (props) => {
  const { id, imageUrl, title } = props.details;
  return (
    <div className="menu-item" key={id}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="content">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default MenuItem;
