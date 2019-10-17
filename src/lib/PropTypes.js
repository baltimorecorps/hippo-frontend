import AirbnbPropTypes from "airbnb-prop-types";
import FacebookPropTypes from "prop-types";

const propTypesHandler = (propTypes, styled = false) => {
  const stylesPropTypes = {
    css: FacebookPropTypes.func.isRequired,
    styles: FacebookPropTypes.object.isRequired,
    theme: FacebookPropTypes.object.isRequired,
  };

  return AirbnbPropTypes.forbidExtraProps({
    ...propTypes,
    ...(styled && stylesPropTypes),
  });
};

const PropTypes = {
  ...AirbnbPropTypes,
  ...FacebookPropTypes,
  date: FacebookPropTypes.instanceOf(Date),
  orNull: (...propTypes) =>
    AirbnbPropTypes.or([...propTypes, AirbnbPropTypes.explicitNull()]),

  handler: propTypesHandler,
};

export default PropTypes;
