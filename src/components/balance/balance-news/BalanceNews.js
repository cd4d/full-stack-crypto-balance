import { React, useState } from 'react';
import { Paginator } from 'primereact/paginator';
import { Button } from 'primereact/button';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewsAction } from '../../../store/news-slice';
import { uiActions } from '../../../store/ui-slice';
export default function BalanceNews() {
  const newsPerPage = 5;

  const [indexFirstNews, setIndexFirstNews] = useState(0);
  const [indexLastNews, setIndexLastNews] = useState(newsPerPage);
  const balance = useSelector((state) => state.balanceReducer.balance);
  const newsList = useSelector((state) => state.newsReducer);
  const error = useSelector((state) => state.uiReducer.error.news);
  const isNewsLoading = useSelector((state) => state.uiReducer.isLoading.news);
  let coinsSlugs = balance.map((coin) => coin.slug);
  const dispatch = useDispatch();
  async function refreshNews() {
    // setIsNewsLoading(true);
    if (coinsSlugs) {

      dispatch(fetchNewsAction(coinsSlugs));
    }
  }
  function onCloseError() {
    // setError(null);
    dispatch(
      uiActions.clearError({
        type: 'news'
      })
    );
  }
  function paginate(e) {
    setIndexFirstNews(e.page * newsPerPage + 1);
    setIndexLastNews(e.page === 0 ? newsPerPage : (e.page + 1) * newsPerPage);
  }
  return (
    <>
      <p>Balance News</p>
      <div className='row'>
        <div className='col-md-4'>
          <h3>News</h3>
        </div>
        {/* Refresh news button */}
        <div className='col-md-2'>
          <Button
            icon='pi pi-refresh'
            className='p-button-sm'
            onClick={refreshNews}
          ></Button>
        </div>
      </div>
      {/* Loading spinner */}
      {isNewsLoading && !error && (
        <div>
          <i className='pi pi-spin pi-spinner' style={{ fontSize: '2rem' }}></i>
        </div>
      )}
      {/* Error message */}
      {error && (
        <div className='alert alert-danger mt-3'>
          <p>{error}</p>
          <button className='btn btn-danger' onClick={onCloseError}>
            Close
          </button>
        </div>
      )}
      {!isNewsLoading && !error  &&  (
        <div>
          {newsList
            .slice(indexFirstNews, indexLastNews)
            .map((element, idx) => (
              <div key={idx} className='list-group'>
                <a href={element.url}>{element.title}</a>
                <p className='news-description'>{}</p>
              </div>
            ))}
          <Paginator
            first={indexFirstNews}
            rows={newsPerPage}
            totalRecords={newsList.length}
            onPageChange={paginate}
          ></Paginator>
        </div>
      )}
    </>
  );
}
