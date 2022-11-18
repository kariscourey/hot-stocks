from fastapi import APIRouter, Depends, Response

# from authenticator import authenticator
from queries.portfolio_stocks import (
    PortfolioStockIn,
    PortfolioStockOut,
    PortfolioStocksOut,
    PortfolioStockQueries,
)

router = APIRouter()


@router.get("/api/portfolio_stocks", response_model = PortfolioStocksOut)
def get_all_portfolio_stocks(
    # user_id: int = Depends(authenticator.get_current_account_data)['account']['id'],
    user_id: int,
    queries: PortfolioStockQueries = Depends()
    ):
    return {
        "portfolio_stocks": queries.create_portfolio_item(),
    }


@router.get("/api/portfolio_stocks", response_model=List[PortfolioListOut])
def portfolio_list(queries: PortfolioStocksQueries = Depends()):
    return {
        "portfolio_stocks": queries.get_all_portfolio_stocks(user_id),
    }


@router.post("/api/portfolio_stocks/", response_model=PortfolioStockOut)
def create_portfolio_stock(
    # user_id: int = Depends(authenticator.get_current_account_data)['account']['id'],
    portfolio_stock_in: PortfolioStockIn,
    user_id: int,
    queries: PortfolioStockQueries = Depends()
    ):
    return queries.create_portfolio_stock(portfolio_stock_in, user_id)


@router.put(
    "api/portfolio_stocks/{portfolio_stock_id}/", response_model=PortfolioStockOut
)
def update_portfolio_stock(
    # user_id: int = Depends(authenticator.get_current_account_data)['account']['id'],
    portfolio_stock_id: int,
    portfolio_stock_in: PortfolioStockIn,
    response: Response,
    queries: PortfolioStockQueries = Depends()
    ):
    record = queries.update_portfolio_stock(portfolio_stock_id, portfolio_stock_in)
    if record is None:
        response.status_code = 404
    else:
        return record


@router.delete("/api/portfolio_stocks/{portfolio_stock_id}", response_model=bool)
def delete_portfolio_stock(
    # user_id: int = Depends(authenticator.get_current_account_data)['account']['id'],
    portfolio_stock_id: int,
    queries: PortfolioStockQueries = Depends()
    ):
    queries.delete_portfolio_stock(portfolio_stock_id)
    return True
