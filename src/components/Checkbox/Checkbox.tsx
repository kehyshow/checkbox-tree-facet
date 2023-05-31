import classnames from "classnames";
import styles from "./checkbox.module.scss";

type checkboxProps = {
  isChecked?: boolean;
  isIndeterminate?: boolean;
  onClick?: () => void;
};

const Checkbox: React.FC<checkboxProps> = ({ isChecked = false, isIndeterminate = false, onClick = () => {} }) => {
  return (
    <span
      className={classnames(styles.checkbox, {
        [styles.isIndeterminate]: isIndeterminate,
        [styles.isChecked]: isChecked,
      })}
      onClick={onClick}
    />
  );
};

export default Checkbox;
