import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import ReactToPrint from 'react-to-print';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import PrintIcon from '@material-ui/icons/Print';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {lighten, makeStyles} from '@material-ui/core/styles';

import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

const columns = [
  {id: 'name', label: 'Name', minWidth: 150, align: 'left'},
  {id: 'status', label: 'Status', minWidth: 50, align: 'right'},
  {
    id: 'programs',
    label: 'Programs',
    minWidth: 50,
    align: 'right',
  },
  {
    id: 'years_exp',
    label: 'Experience (years)',
    minWidth: 50,
    align: 'right',
  },
  {
    id: 'job_search_status',
    label: 'Job Search Status',
    minWidth: 150,
    align: 'right',
  },
];

function createData({
  status,
  first_name,
  last_name,
  programs,
  years_exp,
  job_search_status,
  phone_primary,
  email,
  id,
  // contact,
}) {
  const nameData = (
    <Typography>
      {first_name} {last_name}
      <br />
      <span style={{color: '#777'}}>
        {email}
        <br />
        {phone_primary}
      </span>
    </Typography>
  );
  const programsData = programs.reduce(
    (programA, programB) => (programA += `, ${programB}`)
  );
  return {
    status,
    nameData,
    years_exp,
    programsData,
    job_search_status,
    phone_primary,
    email,
    id,
    // contact,
  };
}

const mockApplicants = [
  {
    account_id: 'google-oauth2|117322007625596379889',
    email: 'amber@baltimorecorps.org',
    first_name: 'Amber',
    id: 130,
    last_name: 'Sample',
    phone_primary: '+1 (240) 319-9783',
    programs: ['PFP', 'PA', 'BF', 'MF'],
    status: 'approved',
    years_exp: '0-2 years',
    job_search_status: 'Actively looking',
  },
  {
    account_id: 'google-oauth2|117322007625596379889',
    email: 'bay@baltimorecorps.org',
    first_name: 'Bay',
    id: 131,
    last_name: 'Chairangsaris',
    phone_primary: '+1 (240) 319-9783',
    programs: ['Place for Purpose', 'Public Aliies'],
    status: 'approved',
    years_exp: '3-5 years',
    job_search_status: 'Looking in 2-6 months',
  },
  {
    account_id: 'google-oauth2|117322007625596379889',
    email: 'billy@baltimorecorps.org',
    first_name: 'Billy',
    id: 132,
    last_name: 'Daly',
    phone_primary: '+1 (240) 319-9783',
    programs: ['Place for Purpose'],
    status: 'approved',
    years_exp: '5+ years',
    job_search_status: 'Just curious',
  },
  {
    account_id: 'google-oauth2|117322007625596379889',
    email: 'taylor@baltimorecorps.org',
    first_name: 'Taylor',
    id: 133,
    last_name: 'Swift',
    phone_primary: '+1 (240) 319-9783',
    programs: ['Place for Purpose', 'Mayoral Fellowship'],
    status: 'approved',
    years_exp: '5+ years',
    job_search_status: 'Curious to see what opportunities are available',
  },
  {
    account_id: 'google-oauth2|117322007625596379889',
    email: 'hello@baltimorecorps.org',
    first_name: 'Hello',
    id: 134,
    last_name: 'Kitty',
    phone_primary: '+1 (240) 319-9783',
    programs: ['Place for Purpose', 'Baltimore Corps Fellowship'],
    status: 'approved',
    years_exp: '3-5 years',
    job_search_status: 'Looking for a job in the next 2-6 months',
  },
  {
    account_id: 'google-oauth2|117322007625596379889',
    email: 'amber2@baltimorecorps.org',
    first_name: 'Amber2',
    id: 135,
    last_name: 'Sample',
    phone_primary: '+1 (240) 319-9783',
    programs: ['Place for Purpose'],
    status: 'approved',
    years_exp: '0-2 years',
    job_search_status: 'Curious to see what opportunities are available',
  },
  {
    account_id: 'google-oauth2|117322007625596379889',
    email: 'bay2@baltimorecorps.org',
    first_name: 'Bay2',
    id: 136,
    last_name: 'Chairangsaris',
    phone_primary: '+1 (240) 319-9783',
    programs: ['Place for Purpose', 'Public Aliies'],
    status: 'approved',
    years_exp: '3-5 years',
    job_search_status: 'Actively looking for a job',
  },
  {
    account_id: 'google-oauth2|117322007625596379889',
    email: 'billy2@baltimorecorps.org',
    first_name: 'Billy2',
    id: 137,
    last_name: 'Daly',
    phone_primary: '+1 (240) 319-9783',
    programs: ['Place for Purpose'],
    status: 'approved',
    years_exp: '5+ years',
    job_search_status: 'Actively looking for a job',
  },
  {
    account_id: 'google-oauth2|117322007625596379889',
    email: 'taylor2@baltimorecorps.org',
    first_name: 'Taylor2',
    id: 138,
    last_name: 'Swift',
    phone_primary: '+1 (240) 319-9783',
    programs: ['Place for Purpose', 'Mayoral Fellowship'],
    status: 'approved',
    years_exp: '5+ years',
    job_search_status: 'Actively looking for a job',
  },
  {
    account_id: 'google-oauth2|117322007625596379889',
    email: 'hello2@baltimorecorps.org',
    first_name: 'Hello2',
    id: 139,
    last_name: 'Kitty',
    phone_primary: '+1 (240) 319-9783',
    programs: ['Place for Purpose', 'Baltimore Corps Fellowship'],
    status: 'approved',
    years_exp: '3-5 years',
    job_search_status: 'Actively looking for a job',
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead style={{backgroundColor: 'hsl(232, 57%, 26%)'}}>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{'aria-label': 'select all desserts'}}
          />
        </TableCell> */}
        {columns.map(headCell => (
          <TableCell
            style={{fontWeight: 'bold'}}
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography style={{color: '#fff'}}>{headCell.label}</Typography>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const {numSelected, print} = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div style={{display: 'flex', alignItems: 'center'}}>
        <Tooltip title="Filter List" style={{marginRight: '10px'}}>
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        <Typography>Filters: Data Analysis</Typography>
      </div>

      <Tooltip title="Print">
        <IconButton aria-label="print">{print}</IconButton>
      </Tooltip>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

function EnhancedTable({classes}) {
  // const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  // const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const tableRef = React.useRef();
  const tablePaginationRef = React.useRef();
  const applicantsRows = mockApplicants.map(applicant => {
    const programs = applicant.programs.reduce((a, b) => {
      return (a += `, ${b}`);
    });
    return createData(
      // applicant.status,
      // `${applicant.first_name} ${applicant.last_name} (${applicant.email}) ${applicant.phone_primary}`,
      // programs,
      // applicant.years_exp,
      // applicant.job_search_status,
      // applicant.phone_primary,
      // applicant.email,
      applicant
    );
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = applicantsRows.map(n => n.contact);
      setSelected(newSelecteds);
      console.log('selected', selected);

      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleChangeDense = event => {
  //   setDense(event.target.checked);
  // };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, applicantsRows.length - page * rowsPerPage);

  const beforeGetContent = () => {
    tablePaginationRef.current.style.display = 'none';
  };
  const beforePrint = () => {
    tablePaginationRef.current.style.display = 'block';
  };
  return (
    <div className={classes.container}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        print={
          <ReactToPrint
            trigger={() => <PrintIcon />}
            content={() => tableRef.current}
            onBeforeGetContent={() => beforeGetContent()}
            onBeforePrint={() => beforePrint()}
          />
        }
      />
      <Paper ref={tableRef}>
        <TableContainer style={{width: '100%'}}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            // size={dense ? 'small' : 'medium'}
            size={'small'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={applicantsRows.length}
            />

            <TableBody>
              {stableSort(applicantsRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row)}
                      // role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      // selected={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{'aria-labelledby': labelId}}
                        />
                      </TableCell> */}
                      <TableCell component="th" id={labelId} scope="row">
                        {row.nameData}
                      </TableCell>
                      <TableCell align="right">
                        <Typography> {row.status} </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography> {row.programsData}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography> {row.years_exp}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography> {row.job_search_status}</Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{height: 33 * emptyRows}}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          ref={tablePaginationRef}
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={applicantsRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </div>
  );
}

// -------------------------------------------------------------------------//
const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    marginTop: spacing(1),

    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  paper: {
    flexGrow: 1,

    [breakpoints.up('sm')]: {
      flexBasis: '83.333333%',
      maxWidth: '83.333333%',
    },
    [breakpoints.up('md')]: {
      flexBasis: '66.666667%',
      maxWidth: '66.666667%',
    },
    [breakpoints.up('xl')]: {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    width: '95%',
    padding: spacing(2, 3, 3),
    margin: spacing(1.5),
  },
});

// export default withStyles(styles)(ApplicantsTable);
export default withStyles(styles)(EnhancedTable);
