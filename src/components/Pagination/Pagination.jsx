import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";

export function Pagination({ total, limit, currentPage, onChangePage, pagesToShow }) {
    const totalPages = Math.ceil(total / limit);

    const calculatePageRange = () =>{
        const halfPagesToShow = Math.floor(pagesToShow / 2);
        let startPage, endPage;
        
        if (totalPages <= pagesToShow) {
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage - halfPagesToShow <= 0) {
            startPage = 1;
            endPage = pagesToShow;
        } else if (currentPage + halfPagesToShow >= totalPages) {
            startPage = totalPages - pagesToShow + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - halfPagesToShow;
            endPage = currentPage + halfPagesToShow;
        }

        if (endPage > totalPages) {
            endPage = totalPages;
        }

        if (startPage < 1) {
            startPage = 1;
        }
        return { startPage, endPage };
        };

    const generatePageNumbers = () => {
        const { startPage, endPage } = calculatePageRange();
        return Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
            );
    };


   

    return (
        <nav>
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <Button
                    className="page-link"
                    onClick={() =>{onChangePage(currentPage -1)}}
                    disabled={currentPage === 1}
                    >
                        Anterior
                    </Button>
                </li>
                {generatePageNumbers().map((page) => (
                    <li
                    key={page}
                    className={`page-item ${currentPage === page ? "active" : ""}`}
                    >
                        <ButtonToolbar aria-label="Toolbar with button groups">
                            <ButtonGroup 
                            className="me-2" aria-label="First group">
                            <Button
                            className="page=link"
                            onClick={() => onChangePage(page)}
                            disabled={currentPage === page}
                            >
                                {page}
                            </Button> 
                            </ButtonGroup>
                        </ButtonToolbar>
                        
                    </li>
                ))}
                <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                >
                </li>
                <Button
                className="page-link"
                onClick={() => onChangePage(currentPage + 1)}
                disabled={currentPage === totalPages} 
                >
                    Próxima
                </Button>
            </ul>
        </nav>
    );
}