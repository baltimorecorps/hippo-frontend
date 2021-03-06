import 'isomorphic-fetch';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import withStyles from '@material-ui/core/styles/withStyles';

import '@gouch/to-title-case';
import findIndex from 'lodash/findIndex';

import {FixedSizeList} from 'react-window';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// See https://material-ui.com/components/autocomplete/#virtualization
// This prevents the whole app from hanging if we get a lot of results back
// from the server
const renderRow = props => {
  const {data, index, style} = props;

  return React.cloneElement(data[index], {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'center',
      paddingTop: 0,
      paddingBottom: 0,
      ...style,
    },
  });
};
const ListboxComponent = React.forwardRef(function ListboxComponent(
  props,
  ref
) {
  const {children, ...other} = props;
  const smUp = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const itemCount = Array.isArray(children) ? children.length : 0;
  const itemSize = smUp ? 36 : 48;

  const outerElementType = React.useMemo(() => {
    return React.forwardRef((props2, ref2) => (
      <div ref={ref2} {...props2} {...other} />
    ));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={ref}>
      <FixedSizeList
        style={{
          padding: 0,
          height: Math.min(8, itemCount) * itemSize,
          maxHeight: 'auto',
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
        itemData={children}
        height={250}
        width="100%"
        outerElementType={outerElementType}
        innerElementType="ul"
        itemSize={itemSize}
        overscanCount={5}
        itemCount={itemCount}
      >
        {renderRow}
      </FixedSizeList>
    </div>
  );
});

const SkillSelect = ({classes, id, load, value, onChange}) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  // const [errors, setErrors] = useState(false)
  // const [charLimit,setCharLimit] = useState("")

  const isNotSelected = candidate =>
    findIndex(value, element => element.name === candidate.name) === -1;

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions([]);
    
      return undefined;
    }

    // // if(inputValue.length >= 15){
    // //   setErrors(true)
    // //   setCharLimit(`${15 - inputValue.length} characters left`)
    // // }

    // if(inputValue.length > 0){
    //   // setErrors(true)
    //   setCharLimit(`${15 - inputValue.length} characters left`)
    // }

    


    // Redefine this inside useEffect to avoid dependency issues
    const isNotSelected = candidate =>
      findIndex(value, element => element.name === candidate.name) === -1;

    (async () => {
      if (typeof inputValue !== 'string') {
        return;
      }

      const cleanValue = inputValue.toTitleCase();
      const inputNew = {
        name: cleanValue,
        label: `Create skill "${cleanValue}"`,
      };
      const inputExists = {
        name: '',
        label: `Skill "${cleanValue}" already added`,
        noAdd: true,
      };

      const alreadyExists = !isNotSelected(inputNew);
      const inputOption = alreadyExists ? inputExists : inputNew;
      setOptions([inputOption]);

      const result = await load(inputValue);
      const exactMatch =
        result.gotExact ||
        (result.matches &&
          result.matches[0] &&
          cleanValue === result.matches[0].name);
      if (active) {
        if (alreadyExists || !exactMatch) {
          setOptions([inputOption, ...result.matches]);
        } else {
          setOptions(result.matches);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [value, inputValue, setOptions, load]);

  const handleInputChange = event => {
    if (event) {
      // if(event.target.value.length >= 15){
      //   setErrors(true)
      //   setCharLimit(`${15 - event.target.value.length} characters left`)}
        setInputValue(event.target.value)
  
    }
  };

  const getItemName = item => {
    const name = item.name || item;
    if (typeof name !== 'string') {
      console.warn(`Item ${item} does not have property 'name'`);
      return item.toString();
    }
    return name;
  };

  const handleChange = (event, value) => {
    onChange(
      value.filter(item => !item.noAdd).map(item => ({name: getItemName(item)}))
    );
    setInputValue('');
  };

  const NewChip = withStyles({
    root: {
      backgroundColor: '#ffe9a1',
    },
  })(Chip);
  return (
    <React.Fragment>
      <Grid>
        <Autocomplete
          id={`add-skill-${id}`}
          multiple
          autoComplete
          autoHighlight
          freeSolo
          closeIcon={null}
          options={options}
          getOptionLabel={option => option.label}
          // Note 'filterSelectedOptions' doesn't work because we use objects
          filterOptions={opts => opts.filter(isNotSelected)}
          value={value}
          onChange={handleChange}
          onInputChange={handleInputChange}
          ListboxComponent={ListboxComponent}
          renderInput={params => (
            <TextField
              {...params}
              // // inputProps={{...params, maxLength:10}}
              // error = {errors}
              // helperText= {charLimit}
              placeholder="Add New Skill"
              fullWidth
              variant="outlined"
            />
          )}
          renderTags={(value, getTagProps) => {
            return value.map((option, index) => {
              return (
                <NewChip
                  className={classes.chip}
                  label={option.name}
                  {...getTagProps({index})}
                />
              );
            });
          }}
        />
      </Grid>
    </React.Fragment>
  );
};

const styles = ({breakpoints, palette, spacing}) => ({
  chip: {
    backgroundColor: '#fff7de',
  },
});

SkillSelect.propTypes = {
  value: PropTypes.array,
  load: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(SkillSelect);
