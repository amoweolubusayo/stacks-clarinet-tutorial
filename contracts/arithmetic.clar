;; arithmetic
;; An on-chain calculator which can perform basic math operations (addition, subtraction, division, and multiplication) 

;; This adds two integers and gives the output
(define-public (addition (x int) (y int) ) 
    (ok (+ x y)))

;; This does the subtraction between two integers and gives the output
(define-read-only (subtraction (x int) (y int))
    (ok (- x y)))

;; This multiplies two integers and gives the output
(define-read-only (multiplication (x int) (y int))
    (ok (* x y)))

;; This does the division between two integers and gives the output
(define-public (division (x int) (y int))
    (ok (/ x y)))
