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
import Badge from '@material-ui/core/Badge';
import {useHistory, useRouteMatch} from 'react-router-dom';

import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';

const columns = [
  {id: 'fullName', label: 'Name', minWidth: 120, align: 'left'},
  {id: 'status', label: 'Status', minWidth: 50, align: 'right'},
  // {
  //   id: 'programsData',
  //   label: 'Programs',
  //   minWidth: '100px',
  //   align: 'right',
  // },
  {
    id: 'years_exp',
    label: 'Experience',
    minWidth: 50,
    align: 'right',
  },
  {
    id: 'job_search_status',
    label: 'Job Search Status',
    minWidth: 120,
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
}) {
  const fullName = `${first_name} ${last_name}`;
  const nameData = (
    <Typography>
      {fullName}
      <br />
      <span style={{color: '#777', fontSize: '14px'}}>
        {email}
        <br />
        {phone_primary}
      </span>
    </Typography>
  );
  // let programsData = '-';
  // if (programs.length === 1) programsData = programs[0];

  // if (programs.length >= 2)
  //   programsData = programs.reduce(
  //     (programA, programB) => (programA += `, ${programB}`)
  //   );

  return {
    status,
    fullName,
    nameData,
    years_exp: years_exp || '-',
    // programsData,
    job_search_status: job_search_status || '-',
    phone_primary,
    email,
    id,
  };
}

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
  const {order, orderBy, onRequestSort} = props;
  const createSortHandler = property => event => {
    event.persist();
    onRequestSort(event, property);
  };
  const classes = useStyles();

  return (
    <TableHead style={{backgroundColor: 'hsl(232, 57%, 26%)', color: '#fff'}}>
      <TableRow>
        {columns.map(headCell => (
          <TableCell
            style={{
              fontWeight: 'bold',
              color: '#fff',
              minWidth: headCell.minWidth,
            }}
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.nameData ? order : false}
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
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#ffffff',
    margin: '20px',
  },
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const {numSelected, print, handleClickOpenFilterForm, filterCount} = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div style={{display: 'flex', alignItems: 'center'}}>
        <Tooltip
          title="Filter List"
          style={{marginRight: '10px'}}
          placement="left"
        >
          <IconButton
            onClick={() => handleClickOpenFilterForm()}
            aria-label="filter list"
          >
            <Badge badgeContent={filterCount} color="primary">
              <FilterListIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      </div>

      <Tooltip title="Print" placement="right">
        <IconButton aria-label="print">{print}</IconButton>
      </Tooltip>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {};

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

function ApplicantsTable({
  classes,
  presentApplicants,
  handleClickOpenFilterForm,
  filterCount,
}) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const tableRef = React.useRef();
  const tablePaginationRef = React.useRef();
  const applicantsRows = presentApplicants.map(applicant => {
    return createData(applicant);
  });
  let history = useHistory();
  const match = useRouteMatch();

  const onClickView = contactId => {
    history.push(`${match.url}/${contactId}`);
  };

  // learn this
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
        print={
          <ReactToPrint
            trigger={() => <PrintIcon />}
            content={() => tableRef.current}
            onBeforeGetContent={() => beforeGetContent()}
            onBeforePrint={() => beforePrint()}
          />
        }
        handleClickOpenFilterForm={handleClickOpenFilterForm}
        filterCount={filterCount}
      />
      <Paper ref={tableRef}>
        <TableContainer style={{width: '100%'}}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'small'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={applicantsRows.length}
            />

            <TableBody>
              {/* learn this code block */}
              {stableSort(applicantsRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={() => onClickView(row.id)}
                      tabIndex={-1}
                      key={row.id}
                      className={classes.tableRow}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        {row.nameData}
                      </TableCell>
                      <TableCell align="right">
                        <Typography> {row.status} </Typography>
                      </TableCell>
                      {/* <TableCell align="right">
                        <Typography> {row.programsData}</Typography>
                      </TableCell> */}

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
                  <TableCell colSpan={6}>
                    {applicantsRows.length === 0 && (
                      <Typography
                        component="p"
                        variant="body1"
                        align="center"
                        className={classes.noResult}
                      >
                        No result found
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          ref={tablePaginationRef}
          rowsPerPageOptions={[10, 20, 50]}
          component="div"
          count={applicantsRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

// -------------------------------------------------------------------------//
const styles = ({breakpoints, palette, spacing}) => ({
  container: {
    marginTop: spacing(1),
    marginBottom: spacing(2),

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
  noResult: {
    marginTop: '20px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    fontSize: '20px',
  },
  tableRow: {
    cursor: 'pointer',
  },
});

export default withStyles(styles)(ApplicantsTable);
