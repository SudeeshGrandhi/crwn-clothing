import MenuItem from "../menu-item/menu-item.component";
import "./directoy.styles.scss";

const Directory = (props) => {
  return (
    <div className="directory">
      {props.state.map(function (details) {
        return <MenuItem details={details} key={details.id} />;
      })}
    </div>
  );
};

export default Directory;
