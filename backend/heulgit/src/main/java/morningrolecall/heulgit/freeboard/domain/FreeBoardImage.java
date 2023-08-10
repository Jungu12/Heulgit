package morningrolecall.heulgit.freeboard.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "freeboard_image")
@JsonIgnoreProperties("freeBoard")
public class FreeBoardImage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "freeboard_image_id", nullable = false)
	private Long freeBoardImageId;

	@Column(name = "file_uri", nullable = false)
	private String fileUri;

	@ManyToOne
	@JoinColumn(name = "freeboard_id", nullable = false)
	private FreeBoard freeBoard;
}