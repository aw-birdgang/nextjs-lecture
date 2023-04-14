import classes from './logistics-item.module.css';
import eventClasses from './event-content.module.css';

function LogisticsItem(props) {
    const { icon: Icon } = props;

    return (
        <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
            <span className={eventClasses.content}>{props.children}</span>
        </li>
    );
}

export default LogisticsItem;
