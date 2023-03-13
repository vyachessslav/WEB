package com.vezhur.web_lab4.exception;

import com.vezhur.web_lab4.dto.ErrorDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;
import java.util.stream.Collectors;

@ControllerAdvice
public class ExceptionHandlerAdvice {

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    private ResponseEntity<ErrorDTO> handleConstraintViolationException(MethodArgumentNotValidException e) {
        BindingResult bindingResult = e.getBindingResult();
        Map<String, String> errors = bindingResult
                .getFieldErrors()
                .stream()
                .collect(Collectors.toMap(FieldError::getField,
                        fieldError -> fieldError.getDefaultMessage() == null ?
                                "Validation failed!" :
                                fieldError.getDefaultMessage()));
        ErrorDTO errorDTO = new ErrorDTO(errors.toString());
        return new ResponseEntity<>(errorDTO, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = DisabledException.class)
    private ResponseEntity<ErrorDTO> handleDisabledException(DisabledException e) {
        ErrorDTO errorDTO = new ErrorDTO("User is not activated!");
        return new ResponseEntity<>(errorDTO, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(value = BadCredentialsException.class)
    private ResponseEntity<ErrorDTO> handleBadCredentialsException(BadCredentialsException e) {
        ErrorDTO errorDTO = new ErrorDTO("Bad credentials!");
        return new ResponseEntity<>(errorDTO, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(value = UserAlreadyExistsException.class)
    private ResponseEntity<ErrorDTO> handleUserAlreadyExistsException(UserAlreadyExistsException e) {
        ErrorDTO errorDTO = new ErrorDTO("User already exists!");
        return new ResponseEntity<>(errorDTO, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(value = InvalidRefreshTokenException.class)
    private ResponseEntity<ErrorDTO> handleInvalidRefreshTokenException(InvalidRefreshTokenException e) {
        ErrorDTO errorDTO = new ErrorDTO(e.getMessage());
        return new ResponseEntity<>(errorDTO, HttpStatus.FORBIDDEN);
    }


}

