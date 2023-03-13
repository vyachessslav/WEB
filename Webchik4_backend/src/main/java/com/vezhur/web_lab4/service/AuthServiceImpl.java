package com.vezhur.web_lab4.service;

import com.vezhur.web_lab4.dao.UserEntity;
import com.vezhur.web_lab4.dao.UserRepo;
import com.vezhur.web_lab4.dto.JwtResponseDTO;
import com.vezhur.web_lab4.dto.UserCredentialsDTO;
import com.vezhur.web_lab4.exception.InvalidRefreshTokenException;
import com.vezhur.web_lab4.exception.UserAlreadyExistsException;
import com.vezhur.web_lab4.security.service.JwtTokenUtil;
import com.vezhur.web_lab4.security.service.UserDetailsImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class AuthServiceImpl implements AuthService {

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;

    @Value("${key.size}")
    private Integer keySize;
    private final UserRepo userRepo;

    @Autowired
    public AuthServiceImpl(PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil,
                           UserRepo userRepo) {
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userRepo = userRepo;
    }

    @Override
    public void registerUser(UserCredentialsDTO userCredentialsDTO) {

        UserEntity user = new UserEntity();
        user.setLogin(userCredentialsDTO.getLogin());
        user.setPassword(passwordEncoder.encode(userCredentialsDTO.getPassword()));

        Optional<UserEntity> userEntityOptional = userRepo.findByLogin(user.getLogin());

        if (userEntityOptional.isPresent()) {
            log.info("User with login: {} already exists!", user.getLogin());
            throw new UserAlreadyExistsException("User already exists!");
        }

        userRepo.save(user);
    }

    @Override
    public JwtResponseDTO loginUser(UserCredentialsDTO userCredentialsDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userCredentialsDTO.getLogin(),
                        userCredentialsDTO.getPassword()));

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        Integer userId = userDetails.getUserId();
        String accessToken = jwtTokenUtil.generateAccessToken(userDetails.getUserId());
        String refreshToken = jwtTokenUtil.generateRefreshToken(userDetails.getUserId());

        return new JwtResponseDTO(userId, accessToken, refreshToken);
    }

    @Override
    public JwtResponseDTO refreshUser(String refreshToken) {
        if (!jwtTokenUtil.validateRefreshToken(refreshToken)) {
            throw new InvalidRefreshTokenException("Invalid refresh token!");
        }

        Integer userId = jwtTokenUtil.getUserIdFromRefreshToken(refreshToken);
        String accessToken = jwtTokenUtil.generateAccessToken(userId);

        return new JwtResponseDTO(userId, accessToken, refreshToken);
    }
}
