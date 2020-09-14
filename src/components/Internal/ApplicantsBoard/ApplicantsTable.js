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
import {useHistory, useRouteMatch} from 'react-router-dom';

import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import TableToolBar from './TableToolBar';

const columns = [
  {
    id: 'name',
    label: 'Name',
    minWidth: 100,
    align: 'left',
    paddingLeft: '18px',
  },
  {id: 'status', label: 'Status', minWidth: 50, align: 'center'},
  // {
  //   id: 'race',
  //   label: 'Race',
  //   minWidth: 80,
  //   align: 'center',
  // },
  {
    id: 'location',
    label: 'Location',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'gender',
    label: 'Gender',
    minWidth: 50,
    align: 'center',
  },
  {
    id: 'years_exp',
    label: 'Experience',
    minWidth: 50,
    align: 'center',
  },
  {
    id: 'job_search_status',
    label: 'Job Search Status',
    minWidth: 80,
    align: 'center',
  },
];

function createData({
  status,
  first_name,
  last_name,
  // race,
  gender,
  city,
  state,
  years_exp,
  job_search_status,
  phone_primary,
  email,
  id,
}) {
  const name = `${first_name} ${last_name}`;
  const nameData = (
    <Typography>
      {name}
      <br />
      <span style={{color: '#777', fontSize: '14px'}}>
        {email}
        <br />
        {phone_primary}
      </span>
    </Typography>
  );
  // const race = ['White', 'Black'];
  // let raceData = '-';
  // if (race.length === 1) raceData = race[0];

  // if (race.length >= 2)
  //   raceData = race.reduce((raceA, raceB) => (raceA += `, ${raceB}`));

  let location = '-';
  if (city && state) location = `${city}, ${state}`;

  return {
    status,
    name,
    nameData,
    location,
    years_exp: years_exp || '-',
    // raceData,
    gender: gender || '-',
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
    <TableHead style={{backgroundColor: '#f0f6ff'}}>
      <TableRow>
        {columns.map(headCell => (
          <TableCell
            style={{
              fontWeight: 'bold',
              minWidth: headCell.minWidth,
              paddingLeft: headCell.paddingLeft || null,
            }}
            key={headCell.id}
            align={headCell.align}
            padding="none"
            sortDirection={orderBy === headCell.nameData ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography
                data-testid="table-head"
                style={{
                  fontWeight: 'bold',
                  minHeight: '40px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {headCell.label}
              </Typography>
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
    width: '100%',
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
  tableSortLabel: {
    color: '#ffffff',
    opacity: 1,
  },
}));

function ApplicantsTable({
  classes,
  presentApplicants,
  handleClickOpenFilterForm,
  filterCount,
  setShowApproveForm,
  showApproveForm,
  filteredContacts,
  setPresentApplicants,
  getSubmittedContacts,
  approveNewContactsStatus,
  submittedApplicants,
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

  const onClickView = contactId => {
    history.push(`/internal/applicants/${contactId}`);
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

  const today = new Date().toLocaleDateString().replace(/\//g, '-');
  const printTitle = `applicants_${today}`;

  return (
    <div className={classes.container} data-testid="applicants-table">
      <TableToolBar
        handleClickOpenFilterForm={handleClickOpenFilterForm}
        filterCount={filterCount}
        setShowApproveForm={setShowApproveForm}
        showApproveForm={showApproveForm}
        filteredContacts={filteredContacts}
        setPresentApplicants={setPresentApplicants}
        getSubmittedContacts={getSubmittedContacts}
        approveNewContactsStatus={approveNewContactsStatus}
        submittedApplicants={submittedApplicants}
        print={
          <ReactToPrint
            trigger={() => <PrintIcon />}
            content={() => tableRef.current}
            onBeforeGetContent={() => beforeGetContent()}
            onBeforePrint={() => beforePrint()}
            documentTitle={printTitle}
          />
        }
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
                  const labelId = `table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={() =>
                        history.push(`/internal/applicants/${row.id}`)
                      }
                      tabIndex={-1}
                      key={row.id}
                      className={classes.tableRow}
                      data-testid="table-row"
                    >
                      <TableCell
                        data-testid="name"
                        component="th"
                        id={labelId}
                        scope="row"
                      >
                        {row.nameData}
                      </TableCell>
                      <TableCell data-testid="status" align="center">
                        <Typography> {row.status} </Typography>
                      </TableCell>
                      <TableCell data-testid="location" align="center">
                        <Typography> {row.location}</Typography>
                      </TableCell>
                      {/* <TableCell align="center">
                        <Typography> {row.raceData}</Typography>
                      </TableCell> */}
                      <TableCell data-testid="gender" align="center">
                        <Typography> {row.gender}</Typography>
                      </TableCell>

                      <TableCell data-testid="experience" align="center">
                        <Typography> {row.years_exp}</Typography>
                      </TableCell>
                      <TableCell data-testid="job_search" align="center">
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
    marginBottom: spacing(2),

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
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
  },
  paper: {},
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
